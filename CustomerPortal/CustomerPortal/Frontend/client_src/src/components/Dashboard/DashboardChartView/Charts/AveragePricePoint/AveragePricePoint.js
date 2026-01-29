import React, { useState, useEffect } from 'react';

import {
  TotalSalesContainer,
  DataContainer,
  DataBlock,
  DataLine,
  DataTitle
} from '../styles/styles';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

//Components
import ChartLoading from '../../../../Loading/ChartLoading/ChartLoading';
import ChartError from '../../../../Errors/ChartError/ChartError';

//Assets
import IconTicket from './assets/icon-ticket.svg';

//API Data Fetch
import { fetch_data } from '../../../../../utils/fetch_data/fetch_data';

const percentageCaret = value => {
  let float = parseFloat(value);
  const style = {
    negative: {
      color: '#ff682e'
    },
    positive: {
      color: '#4DAA57'
    }
  };
  if (float > 0) {
    return <FontAwesomeIcon icon={faCaretUp} style={style.positive} />;
  } else {
    return <FontAwesomeIcon icon={faCaretDown} style={style.negative} />;
  }
};

const dataContainer = data => {
  return (
    
      <DataContainer>
        <DataBlock>
          <DataLine>
            <h3>${data.averagePrice}</h3>
          </DataLine>
          <DataTitle>Average Price Point</DataTitle>
        </DataBlock>
      </DataContainer>
    
  );
};
const AveragePricePoint = props => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    const { averagePricePoint } = fetch_data;

    averagePricePoint()
      .then(response => {
        setData(response);
        setIsLoading(false);
      })
      .catch(error => {
        setError(true);
        setIsLoading(false);
      });

      console.log(averagePricePoint);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {data ? dataContainer(data) : null}
      {isLoading ? <ChartLoading /> : null}
      {error ? <ChartError /> : null}
    </div>
  );
};

export default AveragePricePoint;
