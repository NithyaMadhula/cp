import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAni = keyframes`${fadeIn}`;

export const MessagePopupContainer = styled.div`
  width: 100%;
  padding: 16px;
  color: ${props => props.theme.warningRed};
  animation: ${fadeInAni} 0.75s ease;
  text-align: center;

  & > .messageText {
    font-size: 0.95em;
    letter-spacing: 0.3px;
  }

  @media ${props => props.theme.tablet} {
    position: static;
    top: 0px;
    transform: translate(0, 0);
  }
`;
