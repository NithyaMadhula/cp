import React from 'react';

//Styles
import {
  GameAnalyticHeader,
  GameChartContainer,
  ChartContainer,
  ChartContainerHeader,
  Chart
} from './styles';

//Components
import GameAnalyticsChart from '../GameAnalyticsChart/GameAnalyticsChart';

import CanShow from '../../../../Authorization/CanShow/CanShow';

const GameAnalytics = props => {
  const { gameData } = props;
  const {
    odds,
    ticketsOrdered,
    prizePayoutPercent,
    numChancesToWin,
    index,
    currentYearSales,
    lastYearSales,
    gameID,
    startDate,
    subDivisionCode,
    ticketPrice
  } = gameData;

  const customerCode = JSON.parse(sessionStorage.getItem('userToken')).customer;
  const ticketPriceFormat = () => parseInt(ticketPrice).toFixed;
  const isCustomerMatching = () => {
    let isMatching = subDivisionCode === customerCode ? true : false;

    return isMatching;
  };

  const formatedNumber = num =>
    new Intl.NumberFormat({
      maximumSignificantDigits: 3
    }).format(num);

  const matchingCustomerCodeAnalytics = () => (
    <div>
      <GameAnalyticHeader>Game Analytics</GameAnalyticHeader>
      <GameChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Ticket Price</ChartContainerHeader>
          <Chart>
            <p> ${parseInt(ticketPrice).toFixed(0)} </p>
          </Chart>
        </ChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Release Date</ChartContainerHeader>
          <Chart>
            <p>{startDate}</p>
          </Chart>
        </ChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Odds</ChartContainerHeader>
          <Chart>
            <p>{odds}</p>
          </Chart>
        </ChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Total Tickets Sold</ChartContainerHeader>
          <Chart>
            <p>{formatedNumber(ticketsOrdered)}</p>
          </Chart>
        </ChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Prize Payout Percentage</ChartContainerHeader>
          <Chart>
            <p>{prizePayoutPercent}%</p>
          </Chart>
        </ChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Chances To Win</ChartContainerHeader>
          <Chart>
            <p>{numChancesToWin}</p>
          </Chart>
        </ChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Performance Score</ChartContainerHeader>
          <Chart>
            <p>{index}</p>
          </Chart>
        </ChartContainer>
        <ChartContainer>
          <ChartContainerHeader>This Year's Sales</ChartContainerHeader>
          <Chart>
            <p>{`$${formatedNumber(currentYearSales)}`}</p>
          </Chart>
        </ChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Last Year's Sales</ChartContainerHeader>
          <Chart>
            <p>{`$${formatedNumber(lastYearSales)}`}</p>
          </Chart>
        </ChartContainer>
        <GameAnalyticsChart gameId={gameID} />
      </GameChartContainer>
    </div>
  );

  const nonMatchingCustomerCodeAnalytics = () => (
    <div>
      <GameAnalyticHeader>Game Analytics</GameAnalyticHeader>
      <GameChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Performance Score</ChartContainerHeader>
          <Chart>
            <p>{index}</p>
          </Chart>
        </ChartContainer>
      </GameChartContainer>
    </div>
  );

  return (
    <div>
      <CanShow
        role={isCustomerMatching() ? 'customerCodeMatch' : null}
        perform="gameAnalytics:show"
        yes={() => matchingCustomerCodeAnalytics()}
        no={() => nonMatchingCustomerCodeAnalytics()}
      />
    </div>
  );
};

export default GameAnalytics;
