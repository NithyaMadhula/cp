import styled, { keyframes } from 'styled-components';

import { fadeIn } from 'react-animations';

const fade = keyframes`
  ${fadeIn}
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const GameMainContainer = styled.div`
  min-height: 400px;
  width: 96%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 8px;
  margin: 0 auto;
  animation: ${fade} 0.7s ease;
`;

export const GameDetailsContainer = styled.div`
  min-height: 400px;
  width: 100%;
  display: flex;
  justify-content: flex-start;

  @media ${props => props.theme.tablet} {
    flex-direction: column;
  }
`;

export const GameInfoContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  max-height: 100%;

  @media ${props => props.theme.tablet} {
    width: 100%;
    margin-top: 10px;
    padding-left: 0;
  }
`;

export const GameTitle = styled.h2`
  width: 100%;
  margin-bottom: 14px;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 40px;
  // margin: 1em 0 14px;
`;

export const GameSubTitle = styled.h5`
  width: 100%;
  margin-bottom: 14px;
  text-transform: uppercase;
  // color: ${props => props.theme.igtGray};
  font-size: 20px;
  font-weight: normal;
`;

export const GameActions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
  margin-top: 20px;

  & > ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 70%;

    @media ${props => props.theme.tablet} {
      flex-direction: column;
      align-items: flex-start;
    }

    & > li,
    a {
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      font-size: 1.1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: 0.2s;

      & > #downloadingIcon {
        color: ${props => props.theme.igtBlue};
        animation: ${spin} infinite 2.5s linear;
      }

      & > #downloadSuccessIcon {
        color: ${props => props.theme.successGreen};
        font-size: 0.9em;

        & > span {
          color: ${props => props.theme.baseColor};
        }
      }

      @media ${props => props.theme.tablet} {
        margin: 14px 0;
      }

      & > span {
        margin-right: 6px;
        font-size: 1.1em;
        color: ${props => props.theme.igtGray};
        transition: 0.2s;

        &:hover {
          color: ${props => props.theme.igtBlue};
          transition: 0.2s;
          transform: scale(1);
        }
      }

      & > a img {
        width: 20px;
        margin-right: 6px;
      }

      &:hover {
        color: ${props => props.theme.igtBlue};
        transition: 0.2s;
        transform: scale(1);
      }
    }

    & > li #addToFavorites {
      font-size: 1.2em;
    }
  }
`;

export const GameCatagories = styled.p`
  width: 100%;

  @media ${props => props.theme.tablet} {
    margin: 14px 0;
  }

  & > span {
    font-weight: normal;
    font-size: 0.85em;
    //text-decoration: underline;
  }
`;

export const GameReleaseDate = styled.p`
  width: 100%;
  margin-top: 14px;

  @media ${props => props.theme.tablet} {
    margin: 14px 0;
  }

  & > span {
    font-weight: normal;
    font-size: 0.85em;
  }
`;

export const GameAnalyticContainer = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;
