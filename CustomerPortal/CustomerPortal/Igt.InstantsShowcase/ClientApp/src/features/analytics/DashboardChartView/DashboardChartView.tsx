import * as React from "react";

//Styles
import {
  DashboardChartContainer,
  DataContainer,
  ChartContainer,
  TotalSalesContainer,
} from "./styles";

//Components
import YtdTicketSales from "./Charts/YtdTicketSales/YtdTicketSales";
import YtdPercentSales from "./Charts/YtdPercentSales/YtdPercentSales";
import TotalSalesOverview from "./Charts/TotalSalesOverview/TotalSalesOverview";
import ChartDisplayContainer from "./Charts/ChartDisplayContainer/ChartDisplayContainer";
import LegacyCharts from "./Charts/LegacyCharts/LegacyCharts";
import { Card } from "@material-ui/core";

const DashboardChartView = (props: any) => {
  return (
    <main>
      <h3 className="section-text pl-2">{props.lotteryName} Metrics</h3>
      <br />
      <TotalSalesOverview lotteryName={props.lotteryName}></TotalSalesOverview>
      <LegacyCharts />
      <br />
      <YtdTicketSales />
      <br />
      <YtdPercentSales />
      <br />
      <br />
    </main>
  );
};
//End
export default DashboardChartView;
