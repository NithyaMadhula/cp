import React from 'react';
import propTypes from 'prop-types';

//Styles
import { LoadingContainer, LoadingMessage } from './styles';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const Loading = ({ message }) => {
  return (
    <LoadingContainer>
      <LoadingContainer>
        <FontAwesomeIcon icon={faSyncAlt} />
        <LoadingMessage>
          {message ? <p>{message}</p> : <p>Loading</p>}
        </LoadingMessage>
      </LoadingContainer>
    </LoadingContainer>
  );
};

Loading.propTypes = {
  message: propTypes.string
};

export default Loading;
