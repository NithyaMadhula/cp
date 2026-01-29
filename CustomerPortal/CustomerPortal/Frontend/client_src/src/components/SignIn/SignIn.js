import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

//Styles
import { SignInForm, InputContainer, FormHeader, FormSubmit } from './styles';

//Components
import ErrorDisplay from '../Errors/ErrorDisplay';
import ButtonSpinner from '../Loading/ButtonSpinner/ButtonSpinner';

//Authentication Utils
import { userAuth } from '../../authentication/authentication';
const { decodeToken } = userAuth;

//Sign In Action
const signUserIn = (
  body,
  setError,
  redirect,
  setIsLoading,
  setNewLoginRedirect
) => {
  const { username, password } = body;
  //Return no action if username or password is empty
  if (!username || !password) {
    return;
  } else {
    setIsLoading(true);
    const url = '/user/authenticate';
    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    fetch(url, fetchConfig)
      .then(data => data.json())
      .then(res => {
        //Decode token to get the user roles
        //Save token and user info into session
        const tokenDecoded = decodeToken(res.access_token);
        let payload = {
          access_token: res.access_token,
          role: tokenDecoded.role,
          user: tokenDecoded.sub,
          name: tokenDecoded.name,
          customer: tokenDecoded.customer
        };
        sessionStorage.clear();
        sessionStorage.setItem('userToken', JSON.stringify(payload));
        setIsLoading(false);

        if (redirect) {
          //Redirect To where the user came from
          redirect(true);
        } else {
          //Redirect to the default dashboard for new logins
          setNewLoginRedirect(true);
        }
      })
      .catch(err => {
        setError(true);
        setIsLoading(false);
      });
  }
};
//

const SignIn = ({ message, redirect }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [newLoginRedirect, setNewLoginRedirect] = useState(false);
  const [error, setError] = useState(false);

  let body = {
    username,
    password
  };
  return (
    <SignInForm>
      {newLoginRedirect ? <Redirect to="/welcome" /> : null}
      {error ? (
        <ErrorDisplay
          message="There was an issue signing in. The password or username may be incorrect. Please try again. If the problem persists, contact your IGT Rep."
          closeAction={() => {
            setError(false);
          }}
        />
      ) : null}
      <FormHeader>
        <h4>Login</h4>
        {message ? (
          <p> {message} </p>
        ) : (
          <p>Already have an account? Sign in below.</p>
        )}
      </FormHeader>
      <InputContainer>
        <input
          type="text"
          name="user"
          placeholder="Username"
          onChange={evt => {
            setUsername(evt.target.value);
          }}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={evt => {
            setPassword(evt.target.value);
          }}
          required
        />
      </InputContainer>
      <FormSubmit
        type="button"
        onClick={() => {
          signUserIn(
            body,
            setError,
            redirect,
            setIsLoading,
            setNewLoginRedirect
          );
        }}
      >
        {isLoading ? <ButtonSpinner color="#fafafa" size="1.5em" /> : 'SIGN IN'}
      </FormSubmit>
    </SignInForm>
  );
};

export default SignIn;
