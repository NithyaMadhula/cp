import styled, { keyframes } from 'styled-components';

const spinningIcon = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

export const LoadingSpinner = styled.div`
  animation: 1s ${spinningIcon} infinite ease;
  & > span {
    color: ${props => props.color};
    font-size: ${props => props.size};
    animation: 1s ${spinningIcon} infinite ease;
  }
`;
