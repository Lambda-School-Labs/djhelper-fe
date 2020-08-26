import React from 'react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Register from '../components/Register';
import { store } from '../redux/reducers';

expect.extend({ toBeInTheDocument });

test('Register page renders correctly', () => {
  const history = createMemoryHistory();
  const { queryByText, getByText, getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Register />
      </Router>
    </Provider>
  );

  const form = getByTestId('registerForm');

  const header = queryByText('Know what your audience wants.');
  const name = getByText('Name');
  const email = getByText('Email');
  const username = getByText('Username');
  const password = getByText('Password');
  const confirmPassword = getByText('Confirm Password');
  const submit = getByText('Submit');

  expect(form).toBeInTheDocument();
  expect(header).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(confirmPassword).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});

test('here link on Register page takes user to Login page', () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <Register />
      </Router>
    </Provider>
  );

  const toLogin = getByTestId('toLogin');
  fireEvent.click(toLogin);
  const currentUrl = history.entries[1].pathname;
  expect(currentUrl).toMatch('/login');
});
