import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

//Assets
import { GameViewPage } from './styles';

//Components
import GameMain from '../../Pages/SingleGameView/ContentBlocks/GameMain/GameMain';
import ErrorDisplay from '../../Errors/ErrorDisplay';

//API Fetch
import { fetch_data } from '../../../utils/fetch_data/fetch_data';

const SingleGameView = props => {
  const { state } = props.location;

  //Hooks
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const fetchGameInfo = () => {
    if (state) {
      const { gameId, concept } = state;
      const { singleConceptGame, singlePublishedGame } = fetch_data;

      if (!gameId) {
        return setError(true);
      }

      if (concept) {
        singleConceptGame(parseInt(gameId))
          .then(data => {
            setData(data);
          })
          .catch(error => {
            setError(true);
          });
      } else {
        singlePublishedGame(parseInt(gameId))
          .then(data => {
            setData(data);
          })
          .catch(error => {
            setError(true);
          });
      }
    }
  };

  //Error Message For This Component
  const errorMessage = () => {
    return (
      <div>
        <span>
          There was an issue loading the data for this page, please refresh and
          try again. If the problem persists, please contact us.</span>
      </div>
    );
  };
  // Fetch Game Info On Initial Render
  useEffect(() => {
    fetchGameInfo();
  }, []);

  return (
    <GameViewPage>
      {error ? (
        <ErrorDisplay
          message={errorMessage()}
          closeAction={() => setError(false)}
        />
      ) : (
        <GameMain
          concept={state.concept}
          gameId={state.gameId}
          gameData={data}
        ></GameMain>
      )}
    </GameViewPage>
  );
};

export default withRouter(SingleGameView);
