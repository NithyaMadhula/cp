import React from 'react';

//FA
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

//Styles
import { LoadingSpinner } from './styles';

const ButtonSpinner = ({ color, size }) => (
  <LoadingSpinner color={color ? color : ''} size={size ? size : ''}>
    <span>
      <FontAwesomeIcon icon={faSyncAlt} />
    </span>
  </LoadingSpinner>
);

export default ButtonSpinner;
