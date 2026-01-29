import React from 'react';
import propTypes from 'prop-types';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import {
  SuccessWrapper,
  SuccessIcon,
  SuccessMessage,
  CloseMessage
} from './styles';

//Returns a success display showing the message. Passed in closeAction is to close the display.
const SuccessNotification = ({ message, closeAction }) => {
  return (
    <SuccessWrapper>
      <SuccessIcon>
        <FontAwesomeIcon icon={faCheckCircle} />
      </SuccessIcon>
      <SuccessMessage>
        {message ? <p>{message}</p> : <p>'Thank you!'</p>}
      </SuccessMessage>
      <CloseMessage type="button" onClick={closeAction}>
        Return
      </CloseMessage>
    </SuccessWrapper>
  );
};

SuccessNotification.propTypes = {
  message: propTypes.string,
  closeAction: propTypes.func.isRequired
};

export default SuccessNotification;
