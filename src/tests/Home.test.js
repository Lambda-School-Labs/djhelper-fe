import React from 'react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Home from '../components/pages/Home';
import { store } from './store';

expect.extend({ toBeInTheDocument });

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

test('Home page contains header content', () => {
  const history = createMemoryHistory();
  const { queryAllByText, queryByText } = render(
    <Router history={history}>
      <Provider store={store}>
        <Home />
      </Provider>
    </Router>
  );

  const NavHeader = queryAllByText(/DJ Helper/i)[0];
  const mainHeader = queryAllByText(/DJ Helper/i)[1];
  const subHeader1 = queryByText(/How DJs easily collect song requests/i);
  const subHeader2 = queryByText(
    /And everyone upvotes the songs they also want to hear!/i
  );

  expect(NavHeader).toBeInTheDocument();
  expect(mainHeader).toBeInTheDocument();
  expect(subHeader1).toBeInTheDocument();
  expect(subHeader2).toBeInTheDocument();
});
