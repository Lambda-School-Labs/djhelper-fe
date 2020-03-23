import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Home from '../components/Home';
import { store } from './store';

test('Home page renders links for register and login', async () => {
  const history = createMemoryHistory();
  const simulatedDom = render(
    <Router history={history}>
      <Provider store={store}>
        <Home />
      </Provider>
    </Router>
  );
  const register = simulatedDom.queryByText('register');
  const login = simulatedDom.queryByText('log in');

  expect(register).toBeInTheDocument();
  expect(login).toBeInTheDocument();
});

test('Home page contains header content', async () => {
  const history = createMemoryHistory();
  const { queryByText } = render(
    <Router history={history}>
      <Provider store={store}>
        <Home />
      </Provider>
    </Router>
  );
  expect(queryAllByText(/DJ Helper/i).toBeInTheDocument());
  expect(
    queryByText(/How DJs easily collect song requests/i).toBeInTheDocument()
  );
  expect(
    queryByText(
      /And everyone upvotes the songs they also want to hear!/i
    ).toBeInTheDocument()
  );
});
