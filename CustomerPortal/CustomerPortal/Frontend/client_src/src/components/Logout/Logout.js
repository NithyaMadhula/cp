import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

//Authentication
import { userAuth } from '../../authentication/authentication';

//Components
import Loading from '../Loading/Loading';

const { logout } = userAuth;

const logUserOut = () => {
  try {
    logout();
    return true;
  } catch (error) {
    return false;
  }
};

//This component logs a user out. It shows a loading screen until it redirects back to the home page, clearing session storage and any user credentials required to access private routes
const Logout = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  useEffect(() => {
    if (logUserOut()) {
      setTimeout(() => {
        setLoggedOut(true);
      }, 1000);
    }
  }, []);
  return loggedOut ? (
    <Redirect to="/" />
  ) : (
    <Loading message="Logging you out.." />
  );
};

export default Logout;
