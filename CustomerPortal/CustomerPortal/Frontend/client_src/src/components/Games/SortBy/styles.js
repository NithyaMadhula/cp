import styled from 'styled-components';

export const SortByContainer = styled.div`
  width: ${props => (props.width ? props.width : '75%')};
  display: flex;
  align-items: flex-end;
  margin-right: 14px;
  position: relative;
  flex-direction: column;
  position: relative;

  @media ${props => props.theme.tablet} {
    width: 100%;
    display: block;
    margin: 7px 0;
  }
`;

export const SortBySelect = styled.div`
  width: 70%;
  border-radius: 3px !important;
  box-shadow: 0px 0px 3px ${props => props.theme.igtLightGray};
  padding: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  cursor: pointer;

  & > span {
    color: ${props => props.theme.igtLightGray};
  }

  @media ${props => props.theme.tablet} {
    width: 100%;
  }

`;

export const SortByMenu = styled.div`
  z-index: 999;
  background: white;
  right: 0;
  bottom: -6px;
  width: 50%;
  display: ${props => (props.isMenuOpen ? 'flex' : 'none')};
  flex-direction: column;
  border-bottom-left-radius: 3px !important;
  border-bottom-right-radius: 3px !important;
  box-shadow: 0px 0px 2px ${props => props.theme.igtLightGray};
  border-top: none;
  min-height: 200px;
  position: absolute;
  right: 0;
  bottom: -250px;
`;

export const SortByMenuOption = styled.div`
  width: 100%;
  transition: 0.3s;
  padding: 6px;

  &:hover {
    cursor: pointer;
    background: #f2f2f2;
  }
`;
