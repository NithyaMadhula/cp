import React from 'react';
import propTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

//Styles
import {
  ErrorContainer,
  ErrorBg,
  ErrorIcon,
  ErrorMessage,
  CloseDisplay
} from './styles';

//Returns an error display showing the message. Passed in closeAction is to close the display.
const ErrorDisplay = ({ message, closeAction, btnText }) => {
  return (
    <ErrorBg>
      <ErrorContainer>
        <ErrorIcon>
          <FontAwesomeIcon icon={faExclamation} />
          <p>Oops!</p>
        </ErrorIcon>
        <ErrorMessage>
          {message ? (
            <p>{message}</p>
          ) : (
            <p>Something went wrong! Please try again.</p>
          )}
        </ErrorMessage>
        <CloseDisplay onClick={closeAction}>
          {btnText ? btnText : 'Close'}
        </CloseDisplay>
      </ErrorContainer>
    </ErrorBg>
  );
};

ErrorDisplay.propTypes = {
  message: propTypes.string,
  closeAction: propTypes.func.isRequired
};

export default ErrorDisplay;
