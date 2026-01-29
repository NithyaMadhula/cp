import React, { useState, useEffect } from 'react';

//Chart
import { Line } from 'react-chartjs-2';

//Styles
import { ChartContainer, ChartTitle } from '../styles/styles';

//Components
import ChartLoading from '../../../../Loading/ChartLoading/ChartLoading';
import ChartError from '../../../../Errors/ChartError/ChartError';

//Chart config...
import { weeklySales } from './chart_config/chart_config';

//API Data Fetch
import { fetch_data } from '../../../../../utils/fetch_data/fetch_data';

//...Chart Config
const { renderChartData, options } = weeklySales;

const WeeklySales = ({ didDataLoad }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    const { ticketBreakdown } = fetch_data;

    ticketBreakdown()
      .then(response => {
        setIsLoading(false);
        didDataLoad(true);
        setData(renderChartData(response));
      })
      .catch(error => {
        setIsLoading(false);
        didDataLoad(false);
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
      {data ? <Line data={data} options={options} /> : null}
    </ChartContainer>
  );
};

export default WeeklySales;
