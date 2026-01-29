import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

export const NoResultContainer = styled.div`
  width: 100%;
  height: 80vh;
  background: none;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-delay: 0.5s;
  animation: 0.5s ease ${fadeInAnimation};
`;

export const NoResultWindow = styled.div`
  width: 400px;
  height: 200px;
  border: ${props => props.theme.igtLightGray} 1.5px solid;
  border-radius: ${props => props.theme.boxRadius};
  background: '#ffffff';
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 10px;

  & > p {
    text-align: center;
  }

  & > span {
    font-size: 2.5em;
    color: ${props => props.theme.igtBlue};
  }
`;

export const NoResultWindowClose = styled.button`
  padding: 12px 28px;
  color: ${props => props.theme.brandWhite};
  border-radius: ${props => props.theme.boxRadius};
  background: ${props => props.theme.igtBlue};
  font-size: 1.1em;
`;
