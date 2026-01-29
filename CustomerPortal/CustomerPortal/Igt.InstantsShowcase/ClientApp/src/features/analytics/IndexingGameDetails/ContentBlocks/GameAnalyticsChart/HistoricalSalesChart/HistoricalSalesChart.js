import React, { Component } from './node_modules/react';

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


//Styles
import { ChartContainer, ChartTitle } from '../styles/styles';
//API Data Fetch
import { fetch_data } from '../../../../utils/fetch_data/fetch_data';

//Chart Config
import { ytdTicketSales } from './chart_config/chart_config';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

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
        ticketBreakdown()
            .then(response => {
                this.setState({ data: renderChartData(response), isLoading: false });
            })
            .catch(error => {
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
                    <h3 className="section-text text-center">YTD Sales By Ticket Price</h3>
                </ChartTitle>
                {data ? <Bar data={data} options={options} /> : null}
            </ChartContainer>
        );
    }
}

export default YtdTicketSales;
