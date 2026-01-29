import React from 'react';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

import { ChartErrorContainer, ChartErrorIcon, ChartMessage } from './styles';

const ChartError = ({ message }) => {
  return (
    <ChartErrorContainer>
      <ChartErrorIcon>
        <FontAwesomeIcon icon={faExclamation} />
      </ChartErrorIcon>
      <ChartMessage>
        {message
          ? { message }
          : 'There was an erorr loading this chart, please refresh the page.'}
      </ChartMessage>
    </ChartErrorContainer>
  );
};

export default ChartError;
