import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { LightBoxContainer, LightBoxImage, LightBoxDataBox, LightBoxHeader, GameDataWrap, CloseLightBox } from './styles';

import { image_paths } from '../../../utils/constants/image_paths';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const { baseImageUrl, imgBasePathConcepts } = image_paths;

class FavoritesLightBox extends Component {
  render() {
    const { game, concept, toggleLightBox } = this.props;
    let imageUrl = concept ? baseImageUrl(game.imgName) : imgBasePathConcepts(game.imgName);

    return (
      <LightBoxContainer>
        <LightBoxHeader>
          <CloseLightBox
            onClick={() => {
              toggleLightBox();
            }}
          >
            <span>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <p>Close</p>
          </CloseLightBox>
          <h3>{game.gameName}</h3>
        </LightBoxHeader>
        <LightBoxImage src={imageUrl} alt="IGT Game" />
        <LightBoxDataBox>
          <GameDataWrap>
            <h4>Ticket Price:</h4>
            <p>${Number(game.ticketPrice).toFixed(2)}</p>
          </GameDataWrap>
          <GameDataWrap>
            <h4>Performance Score:</h4>
            <p>{game.index}</p>
          </GameDataWrap>
          <GameDataWrap>
            <h4>Prize Payout:</h4>
            <p>{Number(game.prizePayoutPercent > 1 ? game.prizePayoutPercent : game.prizePayoutPercent * 100).toFixed(2)}%</p>
          </GameDataWrap>
          <GameDataWrap>
            <h4>Odds:</h4>
            <p>{Number(game.calcOdds).toFixed(2)}</p>
          </GameDataWrap>
          <GameDataWrap>
            <h4>Launch date:</h4>
            <p>{game.isWorkingPapers ? game.startDate : 'N/A'}</p>
          </GameDataWrap>
          <GameDataWrap>
            <h4>Jurisdiction:</h4>
            <p>{game.subDivisionName}</p>
          </GameDataWrap>
          <GameDataWrap>
            <h4>Game Number:</h4>
            <p>{game.gameNumber}</p>
          </GameDataWrap>
        </LightBoxDataBox>
        <Link
          to={{
            pathname: `/viewgame/?gameid=${game.gameID}`,
            state: { gameId: game.gameID, concept: concept ? false : true },
          }}
        >
          View Game
        </Link>
      </LightBoxContainer>
    );
  }
}

export default FavoritesLightBox;
