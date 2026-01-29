import React, { Component } from 'react';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChartBar } from '@fortawesome/free-solid-svg-icons';

//Components
import FavoritesLightBox from '../FavoritesLightBox/FavoritesLightBox';
import NoFavoritesWarning from './NoFavoritesWarning/NoFavoritesWarning';

//Styles
import {
  FavoritesViewContainer,
  FavoritesGameCard,
  FavoritesGameCardPhoto,
  FavoritesGameTitle,
  FavoriteGamesInfoWrap,
  ActionButton,
  ActionButtonWrap,
  GameDataWrap,
  GameDataContainer,
} from './styles';

//Utils
import { image_paths } from '../../../utils/constants/image_paths';
const { baseImageUrl, imgBasePathConcepts } = image_paths;

class FavoritesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteGames: null,
      showLightBox: false,
      toggleFavoritedGame: false,
      prevClickedFavoriteGameId: null,
      imageDownloading: false,
      imageDownloadError: false,
      redirectState: { gameID: null, concept: null },
      redirect: false,
      game: null,
      concept: null,
      error: false,
      emptyFavorites: false,
    };
  }

  toggleLightBox = (game, concept) => {
    this.setState((prevState) => ({
      showLightBox: !prevState.showLightBox,
      game,
      concept,
    }));
  };

  toggleLightBoxOff = () => {
    this.setState((prevState) => ({
      showLightBox: !prevState.showLightBox,
    }));
  };

  toggleFavoritedGame = (event, i) => {
    const { target } = event;
    const { innerText } = target;
    const { deleteFavorite } = this.props;
    const { favoriteGames } = this.state;

    const favoriteId = target.getAttribute('favoriteid');

    switch (innerText) {
      case 'REMOVE FROM FAVORITES':
        deleteFavorite(favoriteId)
          .then((response) => {
            favoriteGames.splice(i, 1);

            this.setState({
              favoriteGames: favoriteGames,
              emptyFavorites: favoriteGames.length === 0 ? true : false,
            });
          })
          .catch((error) => this.setState({ error: true }));

        break;
      default:
        break;
    }
  };

  downloadImageToDisk = (gameName, imageUrl, event) => {
    const { downloadImage } = this.props;
    const { target } = event;

    if (target.innerText === 'Saved To Device') {
      return;
    }

    target.innerText = 'Downloading..';

    downloadImage(gameName, imageUrl)
      .then((response) => {
        target.innerText = 'Saved To Device';
      })
      .catch((error) => {
        target.innerText = 'Error Downloading';
      });
  };

  redirectToSingleGameView = (game, concept) => {
    this.setState({
      redirect: true,
      redirectState: { game, concept },
    });
  };

  renderFavoriteGameCards = () => {
    const { emptyFavorites, favoriteGames } = this.state;
    let renderedCards = [];

    if (emptyFavorites) {
      return;
    }

    favoriteGames.forEach((game, i) => {
      let concept = game.isWorkingPapers === 1 ? true : false;
      let imageUrl = concept ? baseImageUrl(game.imgName) : imgBasePathConcepts(game.imgName);

      renderedCards.push(
        <FavoritesGameCard key={i}>
          <FavoritesGameCardPhoto bgImage={imageUrl}></FavoritesGameCardPhoto>
          <FavoriteGamesInfoWrap>
            <FavoritesGameTitle>{game.gameName}</FavoritesGameTitle>
            <GameDataContainer>
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
            </GameDataContainer>
            <ActionButtonWrap>
              <ActionButton
                onClick={() => {
                  this.toggleLightBox(game, concept);
                }}
              >
                <span>
                  <FontAwesomeIcon icon={faChartBar} />
                </span>
                <p>View Data</p>
              </ActionButton>
              <ActionButton>
                <span className="heartIcon">
                  <FontAwesomeIcon icon={faHeart} />
                </span>
                <p favoriteid={game.favoriteID} onClick={(e) => this.toggleFavoritedGame(e, i)}>
                  Remove From Favorites
                </p>
              </ActionButton>
              <ActionButton>
                <span>
                  <img src={imageUrl} alt="IGT Game" />
                </span>
                {/* <p
                  onClick={e => {
                    this.downloadImageToDisk(game.gameName, imageUrl, e);
                  }}
                >
                  Download
                </p> */}
                <a href={imageUrl} download>
                  Download{' '}
                </a>
              </ActionButton>
            </ActionButtonWrap>
          </FavoriteGamesInfoWrap>
        </FavoritesGameCard>
      );
    });

    return renderedCards;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.favoriteGames !== this.props.favoriteGames) {
      if (this.props.favoriteGames.status === 404) {
        this.setState({
          favoriteGames: null,
          emptyFavorites: true,
        });
      } else {
        this.setState({ favoriteGames: this.props.favoriteGames });
      }
    }

    if (prevProps.error !== this.props.error) {
      if (this.props.error) {
        this.setState({ error: true });
      }
      if (!this.props.error) {
        this.setState({ error: false });
      }
    }
  }
  render() {
    const { favoriteGames, showLightBox, game, concept, error, emptyFavorites } = this.state;

    return (
      <FavoritesViewContainer>
        {favoriteGames ? this.renderFavoriteGameCards() : null}
        {emptyFavorites ? <NoFavoritesWarning /> : null}
        {showLightBox ? <FavoritesLightBox game={game} concept={concept} toggleLightBox={this.toggleLightBoxOff} /> : null}
        {error ? <NoFavoritesWarning message="There was an issue loading your favorites. Please refresh." /> : null}
      </FavoritesViewContainer>
    );
  }
}

export default FavoritesView;
