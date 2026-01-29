import styled, { keyframes } from 'styled-components';
import { slideInLeft } from 'react-animations';

const slideIn = keyframes`
    ${slideInLeft};
`;

export const LandingPageContainer = styled.div`
  height: 100%;
  width: 100%;
  animation: 0.5s ${slideIn} ease;
`;
