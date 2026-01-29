import React from 'react';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

//Styles
import { ChartLoadingContainer } from './styles';

const ChartLoading = () => {
  return (
    <ChartLoadingContainer>
      <FontAwesomeIcon icon={faSyncAlt} />
    </ChartLoadingContainer>
  );
};

export default ChartLoading;
