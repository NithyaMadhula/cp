import React from "react";

//Styles
import {
  GameAnalyticHeader,
  GameChartContainer,
  ChartContainer,
  ChartContainerHeader,
  Chart,
} from "./styles";

//Components
import GameAnalyticsChart from "../GameAnalyticsChart/GameAnalyticsChart";

const GameAnalytics = (props) => {
  const [gameData, setGameData] = React.useState(null);

  React.useEffect(() => {
    setGameData(props.gameData);
  }, [props.gameData, setGameData]);

  const customerCode = sessionStorage.getItem("customerCode");
  const ticketPriceFormat = () => parseInt(gameData.ticketPrice).toFixed;
  const isCustomerMatching = () => {
    let isMatching = gameData.subDivisionCode === customerCode ? true : false;

    return isMatching;
  };

  const formatedNumber = (num) =>
    new Intl.NumberFormat({
      maximumSignificantDigits: 3,
    }).format(num);

  const matchingCustomerCodeAnalytics = () => (
    <div>
      <GameChartContainer>
        <GameAnalyticsChart gameData={gameData} />
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
            <p>{gameData.index}</p>
          </Chart>
        </ChartContainer>
      </GameChartContainer>
    </div>
  );

  return <div>{matchingCustomerCodeAnalytics()}</div>;
};

export default GameAnalytics;
