import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//Utils - Auth
import { userAuth } from '../../../authentication/authentication';
const { isAuthenticated } = userAuth;

//Checks if a user isAuthenticated. If so, it renders the passed in secure component. If not, it renders a redirect to /signin
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
