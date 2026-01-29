import styled from 'styled-components';

export const SearchResultsContainer = styled.div`
  width: 96%;
  min-height: 100vh;
  margin: 18px auto 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const SearchInputWrap = styled.div`
  position: relative;

  @media ${props => props.theme.tablet} {
    width: 100%;
    margin: 7px 0;
  }
`;

export const GameViewControlsWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
export const GameViewControls = styled.div`
  width: 50%;
  padding: 14px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  @media ${props => props.theme.tablet} {
    flex-flow: column;
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
