import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const fadeInAnimation = keyframes`${fadeIn}`;

export const DashboardChartContainer = styled.div`
  min-height: 500px;
  width: 96%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media ${(props) => props.theme.tablet} {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const SideNavigation = styled.div`
  width: 15%;
  min-height: 100vh;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 15px;
  margin-top: -16px;
  padding-top: 16px;

  @media ${(props) => props.theme.tablet} {
    width: 100%;
    min-height: 50px;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0;
  }

  & ul {
    @media ${(props) => props.theme.tablet} {
      justify-content: flex-start;
    }
  }
`;

export const DataContainer = styled.div`
  width: 100%;
  animation: ${fadeInAnimation} ease 0.8s;
  @media ${(props) => props.theme.tablet} {
    margin-top: 1em;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  @media ${(props) => props.theme.tablet} {
    width: 100%;
    flex-direction: column;
  }
`;

export const TotalSalesContainer = styled.div`
  width: 100%;

  @media ${(props) => props.theme.tablet} {
    width: 90%;
  }
`;

export const ChartDisplayContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;

  @media ${(props) => props.theme.tablet} {
    flex-direction: column;
    justify-content: center;
    width: 90%;
  }
`;

export const HeaderGreeting = styled.div`
  width: 100%;
  font-size: 1.75em;
  margin: 0 0 1.5em;

  @media ${(props) => props.theme.tablet} {
    width: 90%;
    margin: 1em 14px 2em;
  }

  & > p span {
    font-weight: 500;
  }
`;
