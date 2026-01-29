import React from 'react';

//Styles
import { DashboardChartContainer, DataContainer, ChartContainer, TotalSalesContainer } from './styles';

//Components
import YtdTicketSales from './Charts/YtdTicketSales/YtdTicketSales';
import YtdPercentSales from './Charts/YtdPercentSales/YtdPercentSales';
import TotalSalesOverview from './Charts/TotalSalesOverview/TotalSalesOverview';
import ChartDisplayContainer from './Charts/ChartDisplayContainer/ChartDisplayContainer';
import LegacyCharts from './Charts/LegacyCharts/LegacyCharts';

const DashboardChartView = (props) => {
  return (
    <DashboardChartContainer>
      <ChartContainer>
        <DataContainer>
          <TotalSalesContainer>
            <h2>{props.lotteryName} Metrics</h2>
            <TotalSalesOverview></TotalSalesOverview>
          </TotalSalesContainer>
          <ChartDisplayContainer>
            <LegacyCharts />
            <YtdTicketSales />
            <YtdPercentSales />
          </ChartDisplayContainer>
        </DataContainer>
      </ChartContainer>
    </DashboardChartContainer>
  );
};
//End
export default DashboardChartView;
