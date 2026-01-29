import React, { useState, useEffect } from "react";

//Chart
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Doughnut } from "react-chartjs-2";

//Styles
import { ChartContainer, ChartTitle } from "../styles/styles";

//API Data Fetch
import { fetch_data } from "../../../../../shared/utils/fetch_data";
import { ytdPercentSales } from "./chart_config/chart_config";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const { options, renderChartData } = ytdPercentSales;

const YtdPercentSales = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    const { ticketBreakdown } = fetch_data;

    ticketBreakdown()
      .then((response) => {
        setIsLoading(false);
        setData(renderChartData(response));
      })
      .catch((error) => {
        setIsLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    fetchData(setData, setError, setIsLoading);
  }, [setData, setIsLoading]);
  return <></>;
};

export default YtdPercentSales;
