import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { withRouter } from 'react-router';

//Styles
import { SignBackInContainer, SignInFormContainer } from './styles';

//Components
import SignIn from '../SignIn';

//Assets
import IGTLogo from './assets/igt_logo_rev.png';

//Function that passes a hook into the SignIn component
const redirect = setRedirectedToReferrer => setRedirectedToReferrer(true);

const SignBackIn = props => {
  const [redirectToReferrer, setRedirectedToReferrer] = useState(false);

  //If redirected to here from a protected route, this will set to the previous path from the page the user came from. If not defaults to dashboard.
  const { state } = props.location;
  const redirectPath = state ? state.from : '/';

  return (
    <SignBackInContainer>
      {/* If redirectToReferrer is true, redirect back to page user came from */}
      {redirectToReferrer ? (
        <Redirect to={redirectPath} />
      ) : (
        <SignInFormContainer>
          <img src={IGTLogo} alt="IGT Logo" />
          <SignIn
            message="Your session has expired. Please login again to proceed."
            redirect={() => {
              redirect(setRedirectedToReferrer);
            }}
          />
        </SignInFormContainer>
      )}
    </SignBackInContainer>
  );
};

export default withRouter(SignBackIn);
