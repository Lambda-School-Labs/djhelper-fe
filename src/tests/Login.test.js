import React from 'react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { debug, render, fireEvent, cleanup } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { Router, BrowserRouter, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from '../components/Login';
import { store } from './store';

expect.extend({ toBeInTheDocument });

test('Login page renders correctly', () => {
  const history = createMemoryHistory();
  const {
    container,
    queryByText,
    getByText,
    getByLabelText,
    getByTestId
  } = render(
    <Provider store={store}>
      <Router history={history}>
        <Login />
      </Router>
    </Provider>
  );

  const header = queryByText('Welcome back!');
  const username = getByText('Username:');
  const password = getByText('Password:');
  const submit = getByTestId('submit-button');
  const toRegistration = getByTestId('toRegistration');

  expect(header).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
  expect(toRegistration).toBeInTheDocument();

  // Finding inputs on Login page
  const usernameInput = getByTestId('usernameInput');
  const passwordInput = getByTestId('passwordInput');

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('here link on Login page takes user to registration page', () => {
  const history = createMemoryHistory();
  const {
    container,
    queryByText,
    getByText,
    getByLabelText,
    getByTestId
  } = render(
    <Provider store={store}>
      <Router history={history}>
        <Login />
      </Router>
    </Provider>
  );
  const tokenPresent = true;

  const toRegistration = getByTestId('toRegistration');
  fireEvent.click(toRegistration);
  const currentUrl = history.entries[1].pathname;
  expect(currentUrl).toMatch('/register');
});
