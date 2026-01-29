import styled from 'styled-components';

export const FavoritesViewContainer = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

export const FavoritesGameCard = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 6px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease all;
  padding: 10px;
  border-radius: ${props => props.theme.boxRadius};

  &:hover {
    background: ${props => props.theme.hoverBgColor};
    transition: 0.3s ease all;
  }

  @media ${props => props.theme.tablet} {
    margin-bottom: 16px;
  }
`;

export const FavoritesGameCardPhoto = styled.div`
  height: 170px;
  width: 200px;
  background: ${props => `url(${props.bgImage})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const FavoriteGamesInfoWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 20px;
`;

export const FavoritesGameTitle = styled.h3`
  color: ${props => props.theme.baseColor};
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-weight: normal;
`;

export const ActionButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
  margin-right: 16px;
  position: relative;

  & > span.heartIcon {
    color: ${props => props.theme.warningRed};
  }

  & > span {
    font-size: 1.2em;
    color: ${props => props.theme.igtBlueLight};

    & > img {
      width: 12px;
    }
  }

  & > p,
  a {
    margin-left: 8px;
    font-size: 0.85em;
    cursor: pointer;
    transition: 0.3s ease all;

    &:hover {
      color: ${props => props.theme.igtBlueLight};
      transition: 0.3s ease all;
    }
  }
`;

export const ActionButtonWrap = styled.div`
  height: 50%;
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const GameDataContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: wrap;
`;

export const GameDataWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;

  @media ${props => props.theme.tablet} {
    margin-bottom: 12px;
  }

  & > h4 {
    color: ${props => props.theme.igtBlue};
    margin-bottom: 0;
  }

  & > p {
    font-size: 0.95em;
    color: ${props => props.theme.igtGray};
    font-weight: bold;
    margin-left: 10px;
  }
`;
