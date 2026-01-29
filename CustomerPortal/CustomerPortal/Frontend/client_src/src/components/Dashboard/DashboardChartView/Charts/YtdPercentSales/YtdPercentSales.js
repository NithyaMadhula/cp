import React, { useState, useEffect } from 'react';

//Chart
import { Doughnut } from 'react-chartjs-2';

//Styles
import { ChartContainer, ChartTitle } from '../styles/styles';

//Components
import ChartLoading from '../../../../Loading/ChartLoading/ChartLoading';
import ChartError from '../../../../Errors/ChartError/ChartError';

//API Data Fetch
import { fetch_data } from '../../../../../utils/fetch_data/fetch_data';
import { ytdPercentSales } from './chart_config/chart_config';

const { options, renderChartData } = ytdPercentSales;

const YtdPercentSales = ({ didDataLoad }) => {
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
        <h5>Ticket Prices Percent Sales YTD</h5>
      </ChartTitle>
      {error ? <ChartError /> : null}
      {isLoading ? <ChartLoading /> : null}
      {data ? <Doughnut data={data} options={options} /> : null}
    </ChartContainer>
  );
};

export default YtdPercentSales;
