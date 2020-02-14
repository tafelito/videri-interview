import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

interface Props {
  route?: string;
  history?: any;
}

export function renderWithRouter(
  ui: JSX.Element,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: Props = {},
) {
  const Wrapper: React.FC = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}
