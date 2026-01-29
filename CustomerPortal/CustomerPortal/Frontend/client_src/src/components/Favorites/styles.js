import styled from 'styled-components';

export const FavoritesPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 96%;
  min-height: 100vh;
  margin: 18px auto 0;
`;

export const FavoritesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const FavoritesPageHeader = styled.div`
  width: 100%;
  text-align: left;
  color: ${props => props.theme.igtBlue};
  height: 100%;
  
  & h1 {
    font-weight: normal;
  }
`;

export const SortByWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 100px;
`;
