import styled from 'styled-components';
// import { slideInRight } from 'react-animations';

// const slideIn = keyframes`${slideInRight}`;

export const NavigationWrapper = styled.nav`
  width: 100%;
  padding: 14px 2%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 99;

  @media ${props => props.theme.tablet} {
    position: fixed;
    background-color: #fff;
    border-bottom: 1px solid ${props => props.theme.igtBlueLight};
    width: 100vw;
  }

  & div:first-child {
    width: 400px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    align-self: flex-end;

    @media ${props => props.theme.tablet} {
      align-self: unset;
      justify-content: unset;
    }

    & ul {
      list-style-type: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      padding: 0 40px 0 0;

      & li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        & img {
          width: 14px;
          height: 14px;
          margin-right: 4px;
        }
      }
    }
  }
  & div:nth-child(2) {
    // width: 100%;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 99;
    @media ${props => props.theme.tablet} {
      justify-content: center;
    }
  }
`;

export const NavLogo = styled.img`
  width: 145px;
`;

export const NavLinksContainer = styled.div`
  display: flex;
  justify-content: flex-end !important;
  align-items: center;
  max-width: 80%;

  @media ${props => props.theme.tablet} {
    display: none !important;
  }

  & a {
    color: ${props => props.theme.igtBlueLight};

    &:last-child {
      color: ${props => props.theme.igtOrange};
    }

    &:hover {
      transition: 0.2s;
      color: ${props => props.theme.igtOrange};
    }
  }
`;

export const NavLink = styled.p`
  text-transform: uppercase;
  font-size: 16px;
  font-family: 'Verlag A', 'Verlag B';
  font-style: normal;
  font-weight: 400;
  list-style-type: none;
  cursor: pointer;
  margin-left: 20px;

  & p {
    margin-left: 12px;
    transition: 0.2s;
  }

  @media ${props => props.theme.tablet} {
    color: #fff;
    font-size: 20px;
  }
`;
