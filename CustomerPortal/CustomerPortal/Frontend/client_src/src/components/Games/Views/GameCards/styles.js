import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`
  ${fadeIn}
`;

export const GameCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 23%;
  margin: 6px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: ${props => props.theme.boxRadius};
  animation-delay: 1s;
  animation: 1.5s ease ${fadeInAnimation};
  padding: 10px 10px;
  background-color: rgba(27, 157, 219, 0.075);
  max-height: 350px;
  border: 1px solid transparent;

  &:hover {
    transform: scale(1);
    background-color: rgba(27, 157, 219, 0.2);
  }

  &:before {
    padding-top: 100%;
    content: '';
    position: absolute;
    // float: left;
  }

  & > a {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99;
  }

  & .extra {
    position: relative;
    padding-bottom: 20px;
    & p {
      margin: 7px 0;
      position: relative;
      display: block;
      width: 100%;
    }
  }
`;

export const GameCardImage = styled.div`
  width: 100%;
  height: 350px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  margin-bottom: 10px;
  display: block;
  position: relative;
`;

export const GameCardTitle = styled.div`
  position: relative;
  width: 100%;
  font-size: 1em;
  // overflow: hidden;
  font-weight: normal;
  letter-spacing: 0.2px;
  color: ${props => props.theme.igtBlue};
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > p {
    color: ${props => props.theme.igtGray};
    font-size: 0.77em;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding-top: 30px;
  transition: 0.2s ease all;
  animation: 0.8s ease ${fadeInAnimation};
`;

export const CardContainerWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const MasterCardsContainer = styled.div`
  width: 100%;
  padding-bottom: 40px;
  position: relative;
`;
