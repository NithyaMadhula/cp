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

import CanShow from '../../../../../Authorization/CanShow/CanShow';

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
      <GameChartContainer>        
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
