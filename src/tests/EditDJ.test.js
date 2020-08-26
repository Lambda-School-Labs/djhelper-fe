import React from 'react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { store } from './store';

import EditDJ from '../components/djs/EditDJ';

expect.extend({ toBeInTheDocument });

test('EditDJ renders inputs and profile image area', () => {
  const history = createMemoryHistory();
  const { getByLabelText, queryByText, getByTestId } = render(
    <Router history={history}>
      <Provider store={store}>
        <EditDJ />
      </Provider>
    </Router>
  );

  const editButton = queryByText(/edit/i);

  expect(editButton).toBeInTheDocument();
  fireEvent.click(editButton);

  const nameInput = getByLabelText(/Name/i);
  const bioInput = getByLabelText(/Bio/i);
  const emailInput = getByLabelText(/Email/i);
  const websiteInput = getByLabelText(/Your Website URL/i);
  const phoneInput = getByLabelText(/Phone Number/i);

  const cancelButton = queryByText(/Cancel/i);
  const deleteButton = queryByText(/Delete Profile/i);
  const saveButton = queryByText(/Save/i);

  const imgArea = getByTestId('profile-img');

  expect(nameInput).toBeInTheDocument();
  expect(bioInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(websiteInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();

  expect(cancelButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();

  expect(imgArea).toBeInTheDocument();
});
