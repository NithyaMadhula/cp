import React, { Component } from "react";

//Chart
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from "react-chartjs-2";

import { historicalPrices } from "./HistoricalSalesChart/chart_config/chart_config";

//Styles
import {
  ChartContainerWrapper,
  ChartContainer,
  ChartContainerHeader,
  Chart,
} from "./styles";

//API Data Fetch
import { fetch_data } from "../../../../../shared/utils/fetch_data";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend

);
const { fetchGameSales } = fetch_data;

//Chart Config
const { renderChartData, options } = historicalPrices;

class GameAnalyticsChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      fetchGameSales(this.props.gameData.gameID)
        .then((response) => {
          this.setState({ data: renderChartData(response), isLoading: false });
        })
        .catch((error) => console.log(error));
    }, 2000);
  }
  render() {
    const { data } = this.state;
    return (
      <ChartContainerWrapper>
        <ChartContainer>
          <ChartContainerHeader className="header-text">
            Historical Sales
          </ChartContainerHeader>
          <Chart>{data ? <Bar data={data} options={options} /> : null}</Chart>
        </ChartContainer>
      </ChartContainerWrapper>
    );
  }
}

export default GameAnalyticsChart;
