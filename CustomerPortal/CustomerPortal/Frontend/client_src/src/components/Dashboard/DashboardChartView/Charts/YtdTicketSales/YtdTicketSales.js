import React, { Component } from 'react';

//Chart
import { Bar } from 'react-chartjs-2';

//Styles
import { ChartContainer, ChartTitle } from '../styles/styles';

//Components
import ChartLoading from '../../../../Loading/ChartLoading/ChartLoading';
import ChartError from '../../../../Errors/ChartError/ChartError';

//API Data Fetch
import { fetch_data } from '../../../../../utils/fetch_data/fetch_data';

//Chart Config
import { ytdTicketSales } from './chart_config/chart_config';

const { ticketBreakdown } = fetch_data;
const { options, renderChartData } = ytdTicketSales;

class YtdTicketSales extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      error: false,
      isLoading: true,
      mounted: false
    };
  }

  fetchData = () => {
    const { didDataLoad } = this.props;
    ticketBreakdown()
      .then(response => {
        didDataLoad(true);
        this.setState({ data: renderChartData(response), isLoading: false });
      })
      .catch(error => {
        didDataLoad(false);
        this.setState({ isLoading: false, error: true });
      });
  };

  componentDidMount() {
    this.setState({ mounted: true });
    this.fetchData();
  }

  componentWillUnmount() {
    this.setState({
      data: null,
      error: false,
      isLoading: true,
      mounted: false
    });
  }

  render() {
    const { error, data, isLoading } = this.state;
    return (
      <ChartContainer>
        <ChartTitle>
          <h5>YTD Sales By Ticket Price</h5>
        </ChartTitle>
        {data ? <Bar data={data} options={options} /> : null}
        {error ? <ChartError /> : null}
        {isLoading ? <ChartLoading /> : null}
      </ChartContainer>
    );
  }
}

export default YtdTicketSales;
