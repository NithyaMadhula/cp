import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

export const FilterGamesContainer = styled.div`
  animation-delay: 0.5s;
  animation: 0.8s ease ${fadeInAnimation};
  min-width: 15%;
  padding: 6px;

  @media ${props => props.theme.tablet} {
    width: 100%;
    height: fit-content;
    padding: 24px 0;
    display: none;
  }
`;
