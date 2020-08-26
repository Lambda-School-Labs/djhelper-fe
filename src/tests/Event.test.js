import React from 'react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { store } from './store';

expect.extend({ toBeInTheDocument });

test('Event components on Dashboard component render all event data', async () => {
  const history = createMemoryHistory();
  const simulatedDom = render(
    <Router history={history}>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </Router>
  );

  const eventButtons = simulatedDom.queryAllByTestId(/event-component/i);
  eventButtons.forEach(button => {
    expect(button).toBeInTheDocument();
  });
});
