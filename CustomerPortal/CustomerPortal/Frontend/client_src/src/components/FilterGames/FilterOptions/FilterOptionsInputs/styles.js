import styled from 'styled-components';

export const InputWrap = styled.div`
  display: flex;
  min-width: 15%;
  justify-content: flex-start;
  align-items: center;

  & > span {
    margin-left: 6px;
  }
  & > .seeMoreLink {
    margin-top: 6px;
    color: ${props => props.theme.igtBlueLight};
    cursor: pointer;
    transition: 0.3s ease all;
    font-size: 0.85em;

    &:hover {
      transition: 0.3s ease all;
      color: ${props => props.theme.igtLightGray};
    }
  }

  & > #licensedProperty {
    display: none;
  }

  & > .filterSeeMoreContainer {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 30%;
    transform: translate(-50%, -50%);
    border-radius: ${props => props.theme.boxRadius};
    background: ${props => props.theme.brandWhite};
    box-shadow: ${props => props.theme.altBoxShadow};
    display: none;
    justify-content: center;
    align-items: center;
    color: black;
    padding: 14px;
    z-index: 999;
  }

  & > .filterSeeMoreShow {
    display: flex !important;
  }
`;

export const SeeMoreOptionsContainer = styled.div`
  height: 75%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  & > button {
    margin-top: 20px;
    border: none;
    background: ${props => props.theme.igtBlue};
    border-radius: ${props => props.theme.boxRadius};
    padding: 0px 14px;
    height: 40px;
    color: ${props => props.theme.brandWhite};
    font-size: 0.9em;
    transition: 0.3s ease all;

    &:hover {
      background: ${props => props.theme.igtGray};
    }
  }
`;

export const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;
