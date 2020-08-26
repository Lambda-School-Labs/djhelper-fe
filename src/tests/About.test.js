import React from 'react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { store } from './store';

import About from '../components/pages/About';

expect.extend({ toBeInTheDocument });

test('About page renders correctly', () => {
  const history = createMemoryHistory();
  const { queryByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <About />
      </Router>
    </Provider>
  );

  const heroText = queryByText('Know what your audience wants.');

  const stepsHeader = queryByText('3 Easy Steps');
  const step1Header = queryByText('Step 1:');
  const step2Header = queryByText('Step 2:');
  const step3Header = queryByText('Step 3:');

  const step1aText = queryByText(
    'Create a DJ account and make pages for your events.'
  );
  const step1bText = queryByText('Share the event pages with your clients.');

  const step2aText = queryByText(
    'Clients create song requests on the events pages.'
  );
  const step2bText = queryByText(
    'Clients also upvote the requests they want to hear.'
  );

  const step3aText = queryByText('See which songs receive the most votes.');
  const step3bText = queryByText(
    'Get additional recommendations from the app, based on those song requests.'
  );
  const step3cText = queryByText('Create awesome playlists!');

  expect(heroText).toBeInTheDocument();

  expect(stepsHeader).toBeInTheDocument();
  expect(step1Header).toBeInTheDocument();
  expect(step2Header).toBeInTheDocument();
  expect(step3Header).toBeInTheDocument();

  expect(step1aText).toBeInTheDocument();
  expect(step1bText).toBeInTheDocument();

  expect(step2aText).toBeInTheDocument();
  expect(step2bText).toBeInTheDocument();

  expect(step3aText).toBeInTheDocument();
  expect(step3bText).toBeInTheDocument();
  expect(step3cText).toBeInTheDocument();
});

test('Link on About page CTA button takes user to registration page', () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Provider store={store}>
      <Router history={history}>
        <About />
      </Router>
    </Provider>
  );

  const toRegistration = getByTestId('toRegistration');
  fireEvent.click(toRegistration);
  const currentUrl = history.entries[1].pathname;
  expect(currentUrl).toMatch('/register');
});
