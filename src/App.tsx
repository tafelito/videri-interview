import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  RouteProps,
  Redirect,
} from 'react-router-dom';

import { fakeAuth } from 'utils/auth';
import Login from 'pages/Login';
import Content from 'pages/Content';

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
  // usually in an app, you want to check if the user is already logged in
  // sometimes that means to do some sort of async operation
  // in that case, while checking auth, there should be a loading spinner

  // const { loading } = useAuth();

  // if (loading) {
  //   return <Loading />;
  // }

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
