import React from 'react';
import App from 'App';
import { renderWithRouter } from 'test-utils';

describe('App', () => {
  test('full app rendering/navigating', () => {
    const { getByText } = renderWithRouter(<App />);
    // render login
    expect(getByText('Sign in')).toBeInTheDocument();
  });

  test('user not authenticated, redirect to login', () => {
    const { getByText } = renderWithRouter(<App />, {
      route: '/clouds',
    });
    expect(getByText('Sign in')).toBeInTheDocument();
  });
});
