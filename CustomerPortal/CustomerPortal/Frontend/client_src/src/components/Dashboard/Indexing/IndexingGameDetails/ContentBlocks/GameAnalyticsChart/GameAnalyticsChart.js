import React, { Component } from 'react';

//Chart
import { Bar } from 'react-chartjs-2';

import { historicalPrices } from './HistoricalSalesChart/chart_config/chart_config';

//Styles
import {
  ChartContainerWrapper,
  ChartContainer,
  ChartContainerHeader,
  Chart
} from './styles';

//API Data Fetch
import { fetch_data } from '../../../../../../utils/fetch_data/fetch_data';
const { fetchGameSales } = fetch_data;

//Chart Config
const { renderChartData, options } = historicalPrices;

class GameAnalyticsChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    const { gameId } = this.props;

    fetchGameSales(gameId)
      .then(response => {
        this.setState({ data: renderChartData(response), isLoading: false });
      })
      .catch(error => console.log(error));
  }
  render() {
    const { data } = this.state;
    return (
      <ChartContainerWrapper>
        <ChartContainer>
          <ChartContainerHeader>Historical Sales</ChartContainerHeader>
          <Chart>{data ? <Bar data={data} options={options} /> : null}</Chart>
        </ChartContainer>
      </ChartContainerWrapper>
    );
  }
}

export default GameAnalyticsChart;
