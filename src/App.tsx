import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  RouteProps,
  Redirect,
} from 'react-router-dom';

import { fakeAuth } from 'utils/auth';
import Login from 'Login';
import Content from 'Content';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/">
          <Content />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
