import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

export const FilterGamesForm = styled.form`
  width: 100%;
  /* height: 500px; */
  overflow: auto;
  animation-delay: 1s;
  animation: 0.8s ease ${fadeInAnimation};
  & h3 {
    font-weight: 500;
    font-size: 2em;
    margin-bottom: 1em;
    @media ${props => props.theme.tablet} {
      font-size: 1.25em;
    }  
  }

  & input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }

  @media ${props => props.theme.tablet} {
    width: 100%;
  }  
`;

export const FilterDropDown = styled.div`
  max-height: auto;
  // overflow: visible;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

export const FilterDropDownType = styled.div`
  width: 100%;
  margin-bottom: 12px;
  animation-delay: 1.2s;
  animation: 0.8s ease ${fadeInAnimation};
`;

export const FilterType = styled.div`
  color: ${props => props.theme.igtGray};
  background: none;
  position: relative;

  & > p {
    font-size: 0.95em;
    text-transform: capitalize;
    font-weight: normal;
    letter-spacing: 0.2px;

    & > svg {
      margin-left: 6px;
    }
  }
`;

export const FilterTypeMask = styled.div`
  z-index: 999;
  background: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  cursor: pointer;

  & > span {
    visibility: hidden;
  }
`;

export const FilterOptionsContainer = styled.div`
  max-height: 0px;
  overflow: hidden;
  transition: all 0.2s ease;
  margin-top: 6px;
`;
