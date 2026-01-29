import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

export const SemanticContainer = styled.div`

  & .input {
    width: 100%;
  }
  & .ui.icon.input > input {
    border-radius: 3px !important;
    box-shadow: 0px 0px 2px ${props => props.theme.igtLightGray};
  }
  & .ui.search > .results {
    max-height: 300px;
    position: absolute;
    overflow: auto;
    width: 100%;
    animation-delay: 0.3s;
    animation: 0.5s ease ${fadeInAnimation};
  }
`;
