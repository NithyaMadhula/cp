import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${props => props.theme.brandWhite};
  z-index: 99;
  font-size: 2.2em;
  color: ${props => props.theme.igtBlueDark};

  & > svg {
    animation: ${spin} infinite 2.5s linear;
  }
`;

export const LoadingMessage = styled.div`
  font-size: 0.22em;
  text-align: center;
  margin-top: 20px;
  color: ${props => props.theme.baseColor};
`;
