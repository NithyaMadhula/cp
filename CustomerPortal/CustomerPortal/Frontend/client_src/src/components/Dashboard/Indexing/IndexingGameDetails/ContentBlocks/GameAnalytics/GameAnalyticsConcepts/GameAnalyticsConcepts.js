import React from 'react';

import {
  GameAnalyticHeader,
  ChartContainer,
  ChartContainerHeader,
  GameChartContainer,
  Chart
} from '../styles';

const GameAnalyticConcepts = ({ gameData }) => {
  const {
    startDate,
    numPlayAreas,
    orientation,
    ticketPrice,
    primaryFeatureName,
    gameReferenceID
  } = gameData;
  return (
    <div>
      <GameAnalyticHeader>Game Analytics</GameAnalyticHeader>
      <GameChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Release Date</ChartContainerHeader>
          <Chart>
            <p>{startDate}</p>
          </Chart>
        </ChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Ticket Price</ChartContainerHeader>
          <Chart>
            <p>${parseInt(ticketPrice).toFixed(0)}</p>
          </Chart>
        </ChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Game Reference ID</ChartContainerHeader>
          <Chart>
            <p>{gameReferenceID}</p>
          </Chart>
        </ChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Orientation</ChartContainerHeader>
          <Chart>
            <p>{orientation}</p>
          </Chart>
        </ChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Number of Play Areas</ChartContainerHeader>
          <Chart>
            <p>{numPlayAreas}</p>
          </Chart>
        </ChartContainer>
        <ChartContainer>
          <ChartContainerHeader>Primary Feature Name</ChartContainerHeader>
          <Chart>
            <p>{primaryFeatureName}</p>
          </Chart>
        </ChartContainer>
      </GameChartContainer>
    </div>
  );
};

export default GameAnalyticConcepts;
