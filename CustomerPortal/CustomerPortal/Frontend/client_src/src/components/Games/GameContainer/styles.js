import styled from 'styled-components';

export const CatalogViewContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
  position: relative;

  @media ${props => props.theme.tablet} {
    flex-direction: column;
    margin-bottom: 20px;
    margin-top: 10px;
  }
`;

export const CatalogViewInnerWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  @media ${props => props.theme.tablet} {
    flex-direction: column;
  }
`;

export const SortByContainer = styled.div`
  width: 100%;

  & > select {
    width: 100%;
  }
  @media ${props => props.theme.tablet} {
    margin: 7px 0;
    width: 100%;
  }
`;

export const SideFilterMenu = styled.div`
  height: 100%;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: height 1s ease all;
  margin-top: 10px;
  position: relative;

  & > p {
    font-weight: normal important;
  }

  @media ${props => props.theme.tablet} {
    min-width: 100%;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    height: 100px;
    display: none;
  }
`;

export const SideFilters = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  & > p {
    font-weight: normal;
  }
`;

export const CatalogCardWrapper = styled.div`
  width: 80%;
  min-height: 800px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 18px;

  @media ${props => props.theme.tablet} {
    min-width: 100%;
  }
`;

export const TableViewToggle = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.igtBlueLight};
  border: none;
  background: none;
  cursor: pointer;
  min-width: 110px;

  & > span:nth-child(1) {
    font-size: 0.85em;
  }

  & > span:nth-child(2) {
    margin-left: 8px;
  }

  @media ${props => props.theme.tablet} {
    width: 100%;
    margin: 14px 0 0;
  }
`;

export const TableViewToggleContainer = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const GameViewControls = styled.div`
  width: 100%;
  padding: 14px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  @media ${props => props.theme.tablet} {
    flex-flow: column;
  }
`;

export const SearchInputWrap = styled.div`
  position: relative;

  @media ${props => props.theme.tablet} {
    width: 100%;
    margin: 7px 0;
  }
`;

export const AdvancedSearchLink = styled.div`
  font-size: 0.8em;
  position: absolute;
  bottom: -18px;
  right: 0;

  & > a {
    transition: 0.3s ease all;
    &:hover {
      transition: 0.3s ease all;
      color: ${props => props.theme.igtLightGray};
    }
  }

  @media ${props => props.theme.tablet} {
    width: 100%;
    margin: 7px 0;
    text-align: center;
    bottom: -30px;
  }
`;

// export const SortingContainer = styled.div`
//   border: solid black;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   height: 100%;
// `;
