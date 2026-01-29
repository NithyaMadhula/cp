import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const ChartLoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.themeBrandWhite};
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    font-size: 2em;
    color: ${props => props.theme.igtBlueDark};
    animation: ${spin} infinite 2s;
  }
`;
