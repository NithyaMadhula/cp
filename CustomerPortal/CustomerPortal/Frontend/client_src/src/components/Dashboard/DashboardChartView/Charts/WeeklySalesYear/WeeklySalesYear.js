import React, { useState, useEffect } from 'react';

//Chart
import { Bar } from 'react-chartjs-2';

//Styles
import { ChartContainer, ChartTitle } from '../styles/styles';

//Components
import ChartLoading from '../../../../Loading/ChartLoading/ChartLoading';
import ChartError from '../../../../Errors/ChartError/ChartError';

//Chart config...
import { weeklySalesYear } from './chart_config/chart_config';

//API Data Fetch
import { fetch_data } from '../../../../../utils/fetch_data/fetch_data';

//...Chart Config
const { renderChartData, options } = weeklySalesYear;

const WeeklySalesYear = ({ didDataLoad }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    const { weeklySalesYear } = fetch_data;

    weeklySalesYear()
      .then(response => {
        setIsLoading(false);
        didDataLoad(true);
        setData(renderChartData(response));
      })
      .catch(error => {
        setIsLoading(false);
        // didDataLoad(false);
        setError(true);
      });

  };

  useEffect(() => {
    fetchData(setData, setError, setIsLoading);
  }, []);
  return (
    <ChartContainer>
      <ChartTitle>
        <h5>Weekly Sales By Ticket Price</h5>
      </ChartTitle>
      {error ? <ChartError /> : null}
      {isLoading ? <ChartLoading /> : null}
      {data ? <Bar data={data} options={options} /> : null}
    </ChartContainer>
  );
};

export default WeeklySalesYear;
