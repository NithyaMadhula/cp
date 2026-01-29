import styled from 'styled-components';

export const GameAnalyticHeader = styled.h2`
  width: 100%;
  margin-top: 2em;
  margin-bottom: 28px;
  font-weight: 500;
  font-size: 28px;
`;

export const GameChartContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  flex-wrap: wrap;

  @media ${props => props.theme.tablet} {
    flex-direction: column;
  }
`;

export const ChartContainer = styled.div`
  margin: 0 5% 14px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${props => props.theme.tablet} {
    width: 100%;
    margin: 10px 0;
  }
`;

export const Chart = styled.div`
  width: 100%;
  // height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > p {
    font-size: 1.5em;
    font-weight: normal;
    letter-spacing: 0.2px;
    color: ${props => props.theme.igtBlueDark};
  }
`;

export const ChartContainerHeader = styled.h5`
  width: 100%;
  text-transform: uppercase;
  color: ${props => props.theme.igtBlack};
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1.3em;
  margin-bottom: 7px;
`;
