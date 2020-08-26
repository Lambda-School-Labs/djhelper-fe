import React from 'react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import EditEvent from '../components/Events/AddEvent';
import { store } from './store';

expect.extend({ toBeInTheDocument });

test('EditEvent page renders inputs for event data', async () => {
  const history = createMemoryHistory();
  const simulatedDom = render(
    <Router history={history}>
      <Provider store={store}>
        <EditEvent />
      </Provider>
    </Router>
  );

  const descriptionLabel = simulatedDom.getByLabelText(/description/i);
  const dateLabel = simulatedDom.getByLabelText(/date/i);
  const typeLabel = simulatedDom.getByLabelText(/type/i);
  const submitButton = simulatedDom.queryByTestId('submit-button');

  expect(descriptionLabel).toBeInTheDocument();
  expect(dateLabel).toBeInTheDocument();
  expect(typeLabel).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
