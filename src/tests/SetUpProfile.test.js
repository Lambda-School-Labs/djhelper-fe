import React from 'react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { store } from './store';

import SetUpProfile from '../components/djs/SetUpProfile';

expect.extend({ toBeInTheDocument });

test('SetUpProfile page renders correctly', () => {
  const history = createMemoryHistory();
  const { queryByText, getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <SetUpProfile />
      </Router>
    </Provider>
  );

  const welcomeText = queryByText(/welcome/i);
  const subHeading = queryByText(/get your profile set up/);

  const imgArea = getByTestId('img-area');
  const plusArea = getByTestId('plus-area');
  let imgInputArea = queryByText('Link to Profile Image');

  const websiteInputArea = queryByText('Website');
  const phoneInputArea = queryByText('Phone');
  const bioInputArea = queryByText('Bio');

  const submitButton = getByTestId('submit-button');
  const skipButton = getByTestId('skip-button');

  expect(welcomeText).toBeInTheDocument();
  expect(subHeading).toBeInTheDocument();

  expect(imgArea).toBeInTheDocument();
  expect(plusArea).toBeInTheDocument();

  // Initially, image input should not display
  expect(imgInputArea).not.toBeInTheDocument();

  // It should display when plus area is clicked
  fireEvent.click(plusArea);
  imgInputArea = queryByText('Link to Profile Image');
  expect(imgInputArea).toBeInTheDocument();

  // It should not display when plus area is clicked again.
  fireEvent.click(plusArea);
  imgInputArea = queryByText('Link to Profile Image');
  expect(imgInputArea).not.toBeInTheDocument();

  expect(websiteInputArea).toBeInTheDocument();
  expect(phoneInputArea).toBeInTheDocument();
  expect(bioInputArea).toBeInTheDocument();

  expect(submitButton).toBeInTheDocument();
  expect(skipButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  const prevUrl = history.entries[0].pathname;
  expect(prevUrl).toMatch('/');
});
