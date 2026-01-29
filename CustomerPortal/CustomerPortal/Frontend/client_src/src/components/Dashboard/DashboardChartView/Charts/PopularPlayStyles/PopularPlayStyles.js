import React, { useState, useEffect } from 'react';

//Chart
import { Polar } from 'react-chartjs-2';

//Styles
import { ChartContainer, ChartTitle } from '../styles/styles';

//Components
import ChartLoading from '../../../../Loading/ChartLoading/ChartLoading';
import ChartError from '../../../../Errors/ChartError/ChartError';

//Chart Config...
import { popularPlayStyles } from './chart_config/chart_config';

//API Fetch Data
import { fetch_data } from '../../../../../utils/fetch_data/fetch_data';
const { playStyleIndexed } = fetch_data;

//Functions
const getUser = () => JSON.parse(sessionStorage.getItem('userToken'));

const PopularPlayStyles = ({ didDataLoad }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    playStyleIndexed()
      .then(response => {
        renderChartData(response);
        didDataLoad(true);
        setIsLoading(false);
      })
      .catch(error => {
        setError(true);
        didDataLoad(false);
        setIsLoading(false);
      });
  };

  const renderChartData = data => {
    const { renderChartData } = popularPlayStyles;
    setData(renderChartData(data));
  };

  useEffect(() => {
    fetchData(setData, setError, setIsLoading);
  }, []);

  const { options } = popularPlayStyles;

  return (
    <ChartContainer>
      <ChartTitle>
        <h5>Most Popular Play Styles in {getUser().name}</h5>
      </ChartTitle>
      {error ? <ChartError /> : null}
      {isLoading ? <ChartLoading /> : null}
      {data ? <Polar data={data} options={options} /> : null}
    </ChartContainer>
  );
};

export default PopularPlayStyles;
