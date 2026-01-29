import styled, { keyframes } from 'styled-components';

import { slideInLeft, slideOutRight } from 'react-animations';

const slideLeftIn = keyframes`
  ${slideInLeft}
`;

const slideRightOut = keyframes`
    ${slideOutRight}
`;

export const CatalogPage = styled.div`
  height: 100%;

  & h1 {
    font-weight: normal;
  }
`;

export const GamesPageContainer = styled.div`
  height: 100%;
  width: 96%;
  margin: 18px auto 0;  
  animation: ${slideLeftIn} 0.5s ease;

  // enter from
  &.games-view-enter {
    animation: ${slideLeftIn} 0.5s ease;
  }

  // exit from
  &.games-view-exit {
    animation: ${slideRightOut} 0.5s ease;
  }

  @media ${props => props.theme.tablet} {
    width: 96%;
    padding-top: 120px;
  }    
`;
