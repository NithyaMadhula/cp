import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

export const GameTableContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-right: 14px;
  animation: 1s ${fadeInAnimation} ease;
  margin-top: 20px;
  position: relative;
  padding-bottom: 70px;

  @media ${props => props.theme.tablet} {
    margin-right: 0;
    width: 100vw;
  }
`;

export const GameTable = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: ${props => props.theme.boxRadius};
  box-shadow: ${props => props.theme.gameTableBoxShadow};

  @media ${props => props.theme.tablet} {
    box-shadow: none;
  }
`;

export const TableLabelContainer = styled.div`
  background: ${props => props.theme.igtBlueOpaque};
  display: flex;
  justify-content: center;
`;

export const TableLabels = styled.div`
  text-align: left;
  width: ${props => props.width};
  padding: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.95em;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    background: #f2f2f2;
    color: ${props => props.theme.igtLightBlue};
  }

  & > span {
    font-size: 0.8em;
    margin-left: 8px;
    color: ${props => props.theme.igtGrey};
  }

  @media ${props => props.theme.tablet} {
    width: 18% !important;
    padding: 1%;
    font-size: 11px;
  }

  &:nth-child(6) {
    @media ${props => props.theme.tablet} {
      display: none;
    }
  }

  &:last-child {
    @media ${props => props.theme.tablet} {
      display: none;
    }
  }
`;

export const GameRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${props => props.bgcolor};
  cursor: pointer;
  transition: 0.3s ease all;

  @media ${props => props.theme.tablet} {
    width: 100% !important;
  }

  &:hover {
    background: #f2f2f2;
    transition: 0.3s ease all;
  }

  & > div:nth-child(1) {
    justify-content: flex-start;

    & img {
      @media ${props => props.theme.tablet} {
        display: none;
      }
    }
  }

  &:nth-child(7) {
    @media ${props => props.theme.tablet} {
      display: none;
    }
  }

  &:last-child {
    @media ${props => props.theme.tablet} {
      display: none;
    }
  }
`;

export const GameRowSection = styled.div`
  padding: 12px;
  width: ${props => props.width};
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${props => props.theme.tablet} {
    width: 18% !important;
    padding: 1%;
    font-size: 10px;
  }

  & > div:nth-child(1) {
    justify-content: flex-start;

    @media ${props => props.theme.tablet} {
      display: none;
    }
  }

  & > p {
    width: 100%;
    text-align: left;
  }

  & > img {
    height: 50px;
    width: 50px;
    margin-right: 10px;
  }
`;
