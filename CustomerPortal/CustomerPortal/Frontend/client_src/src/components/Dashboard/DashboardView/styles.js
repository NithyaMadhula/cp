import styled, { keyframes } from 'styled-components';

import { slideInLeft, slideOutRight } from 'react-animations';

const slideLeftIn = keyframes`
  ${slideInLeft}
`;

const slideRightOut = keyframes`
    ${slideOutRight}
`;

export const DashboardViewContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  width: 100%;
  animation: ${slideLeftIn} 0.5s ease;

  @media ${props => props.theme.tablet} {
    padding-top: 82px;
  }


  // enter from
  &.dashboard-view-enter {
    animation: ${slideLeftIn} 0.5s ease;
  }

  // exit from
  &.dashboard-view-exit {
    animation: ${slideRightOut} 0.5s ease;
  }
`;
