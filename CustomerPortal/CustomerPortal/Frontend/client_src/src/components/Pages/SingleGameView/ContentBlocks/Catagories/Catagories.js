import React from 'react';
import { Link } from 'react-router-dom';

//Styles
import { GameCatagoriesContainer, CatagoriesWrap } from './styles';

const linkToPath = (searchedProperty, searchedValue) => {
  const url = `/concepts?${searchedProperty}=${searchedValue}`;

  return url;
};

const Catagories = ({ gameData, concept }) => {
  return (
    <CatagoriesWrap>
      <h4>Categories</h4>
      {concept ? (
        <GameCatagoriesContainer>
          {gameData.primaryThemeName ? (
            <Link
              to={linkToPath('primaryThemeName', gameData.primaryThemeName)}
            >
              {gameData.primaryThemeName}
            </Link>
          ) : null}

          {gameData.primaryFeatureName ? (
            <Link
              to={linkToPath('primaryFeatureName', gameData.primaryFeatureName)}
            >
              {gameData.primaryFeatureName}
            </Link>
          ) : null}

          {gameData.secondaryFeatureName ? (
            <Link
              to={linkToPath(
                'secondaryFeatureName',
                gameData.secondaryFeatureName
              )}
            >
              {gameData.secondaryFeatureName}
            </Link>
          ) : null}

          {gameData.primaryPlayStyle ? (
            <Link
              to={linkToPath('primaryPlayStyle', gameData.primaryPlayStyle)}
            >
              {gameData.primaryPlayStyle}
            </Link>
          ) : null}

          {gameData.primaryColorName ? (
            <Link
              to={linkToPath('primaryColorName', gameData.primaryColorName)}
            >
              {gameData.primaryColorName}
            </Link>
          ) : null}
        </GameCatagoriesContainer>
      ) : (
        <GameCatagoriesContainer>
          {gameData.primaryThemeName ? (
            <p>{gameData.primaryThemeName}</p>
          ) : null}

          {gameData.primaryFeatureName ? (
            <p>{gameData.primaryFeatureName}</p>
          ) : null}

          {gameData.secondaryFeatureName ? (
            <p>{gameData.secondaryFeatureName}</p>
          ) : null}

          {gameData.primaryPlayStyle ? (
            <p> {gameData.primaryPlayStyle} </p>
          ) : null}

          {gameData.primaryColorName ? (
            <p> {gameData.primaryColorName} </p>
          ) : null}
        </GameCatagoriesContainer>
      )}
    </CatagoriesWrap>
  );
};

export default Catagories;
