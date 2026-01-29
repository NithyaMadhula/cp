import styled from 'styled-components';

export const HamburgerMenuContainer = styled.div`
  display: none;
  & > span {
    font-size: 1.6em;
    cursor: pointer;
    transition: 0.2s ease;
    color: ${props => props.theme.igtBlueDark};
    position: relative;
    z-index: 9999;
    &:hover {
      //color: #fff;
      color: ${props => props.theme.igtLightGray};
      transition: 0.2s ease;
    }
  }

  @media ${props => props.theme.tablet} {
    display: block;
    position: relative;
    right: 10px;
  }
`;

export const HamburgerTray = styled.div`
  position: fixed;
  right: -2000px;
  top: 0;
  min-height: 100vh;
  background-color: ${props => props.theme.igtBlueDark};
  //background: ${props => props.theme.brandWhite};
  width: 100%;
  transition: 0.2s ease all;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1000;

  @media ${props => props.theme.mobileL} {
    width: 100% !important;
  }
`;

export const MobileLinkContainer = styled.div`
  height: 300px;
  width: 90%;
  display: flex;
  justify-content: space-around !important;
  flex-direction: column;
  align-items: center !important;

  & > a {
    text-align: center;
  }
`;
