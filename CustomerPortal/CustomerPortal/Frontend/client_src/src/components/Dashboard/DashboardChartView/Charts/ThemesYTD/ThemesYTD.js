import React, { useState, useEffect } from 'react';

//Chart
import { Bar } from 'react-chartjs-2';

//Styles
import { ChartContainer, ChartTitle } from '../styles/styles';

//Components
import ChartLoading from '../../../../Loading/ChartLoading/ChartLoading';
import ChartError from '../../../../Errors/ChartError/ChartError';

//Chart Config...
import { themesYTD } from './chart_config/chart_config';

//API Fetch Data
import { fetch_data } from '../../../../../utils/fetch_data/fetch_data';
const { themesPrior } = fetch_data;

//Functions

const PopularThemes = ({ didDataLoad }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    themesPrior()
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
    const { renderChartData } = themesYTD;
    setData(renderChartData(data));
  };

  useEffect(() => {
    fetchData(setData, setError, setIsLoading);
  }, []);

  const { options } = themesYTD;

  return (
    <ChartContainer>
      <ChartTitle>
        <h5>Themes YTD</h5>
      </ChartTitle>
      {error ? <ChartError /> : null}
      {isLoading ? <ChartLoading /> : null}
      {data ? <Bar data={data} options={options} /> : null}
    </ChartContainer>
  );
};

export default PopularThemes;
