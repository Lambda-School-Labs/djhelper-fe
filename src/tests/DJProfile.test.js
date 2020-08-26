import React from 'react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { store } from './store';

import DJProfile from '../components/djs/DJProfile';

expect.extend({ toBeInTheDocument });

test('DJProfile renders top navbar', () => {
  const history = createMemoryHistory();
  const { queryAllByText } = render(
    <Router history={history}>
      <Provider store={store}>
        <DJProfile />
      </Provider>
    </Router>
  );

  const NavHeader = queryAllByText(/DJ Helper/i)[0];
  expect(NavHeader).toBeInTheDocument();
});

test("DJProfile displays DJ's information", () => {
  const history = createMemoryHistory();
  const { queryByText } = render(
    <Router history={history}>
      <Provider store={store}>
        <DJProfile />
      </Provider>
    </Router>
  );

  const nameArea = queryByText(/name/i);
  const emailArea = queryByText(/email/i);
  const websiteArea = queryByText(/website/i);
  const phoneArea = queryByText(/phone/i);

  expect(nameArea).toBeInTheDocument();
  expect(emailArea).toBeInTheDocument();
  expect(websiteArea).toBeInTheDocument();
  expect(phoneArea).toBeInTheDocument();
});

test('DJProfile displays functional edit button', () => {
  const history = createMemoryHistory();
  const { queryByText, getByLabelText, getByTestId } = render(
    <Router history={history}>
      <Provider store={store}>
        <DJProfile />
      </Provider>
    </Router>
  );

  const editButton = queryByText(/edit/i);

  expect(editButton).toBeInTheDocument();
  fireEvent.click(editButton);

  // When editButton is clicked, inputs are displayed

  expect(editButton).not.toBeInTheDocument();
  const nameInput = getByLabelText(/Name/i);
  const bioInput = getByLabelText(/Bio/i);
  const emailInput = getByLabelText(/Email/i);
  const websiteInput = getByLabelText(/Your Website URL/i);
  const phoneInput = getByLabelText(/Phone Number/i);

  const cancelButton = queryByText(/Cancel/i);
  const deleteButton = queryByText(/Delete Profile/i);

  const triggerImgEditIcon = getByTestId('trigger-img-edit');

  expect(nameInput).toBeInTheDocument();
  expect(bioInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(websiteInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();

  expect(cancelButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();

  // Input field for profile image src edit is displayed when pencil icon is clicked:

  expect(triggerImgEditIcon).toBeInTheDocument();
  fireEvent.click(triggerImgEditIcon);

  const imgInput = getByLabelText(/Link to Profile Image/i);
  expect(imgInput).toBeInTheDocument();

  // Clicking on cancel button hides display of inputs
  fireEvent.click(cancelButton);
  expect(imgInput).not.toBeInTheDocument();
  expect(nameInput).not.toBeInTheDocument();
  expect(bioInput).not.toBeInTheDocument();
  expect(emailInput).not.toBeInTheDocument();
  expect(websiteInput).not.toBeInTheDocument();
  expect(cancelButton).not.toBeInTheDocument();
  expect(deleteButton).not.toBeInTheDocument();
});

test('Clicking on edit button and then delete button triggers message display and confirmation buttons', () => {
  const history = createMemoryHistory();
  const { queryByText, getByLabelText, getByTestId } = render(
    <Router history={history}>
      <Provider store={store}>
        <DJProfile />
      </Provider>
    </Router>
  );

  const editButton = queryByText(/edit/i);
  expect(editButton).toBeInTheDocument();
  fireEvent.click(editButton);

  let deleteButton = queryByText(/delete profile/i);
  expect(deleteButton).toBeInTheDocument();
  fireEvent.click(deleteButton);

  const question = queryByText(
    /are you 100% sure that you want to delete your account?/i
  );
  const yesButton = queryByText(/Yes, delete my account/i);
  const noButton = queryByText(/No, go ahead and keep my account/i);

  expect(question).toBeInTheDocument();
  expect(yesButton).toBeInTheDocument();
  expect(noButton).toBeInTheDocument();

  // Clicking on noButton cancels message and confirmation buttons' display
  fireEvent.click(noButton);
  expect(question).not.toBeInTheDocument();
  expect(yesButton).not.toBeInTheDocument();
  expect(noButton).not.toBeInTheDocument();

  deleteButton = queryByText(/delete profile/i);
  expect(deleteButton).toBeInTheDocument();
});
