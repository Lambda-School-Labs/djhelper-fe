import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { store } from './store';

import App from '../components/pages/Home';

test('App component renders to Homepage', () => {
  const history = createMemoryHistory();
  const { container, queryByText, getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );

  const currentUrl = history.entries[0].pathname;
  expect(currentUrl).toMatch('/');
});

test('Login link sends user to the login page', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );

  fireEvent.click(getByText(/log in/i));

  const currentUrl = history.entries[1].pathname;
  expect(currentUrl).toMatch('/login');
});

test('Register link sends user to the register page', () => {
  const history = createMemoryHistory();
  const { container, queryByText, getByText, getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
});
