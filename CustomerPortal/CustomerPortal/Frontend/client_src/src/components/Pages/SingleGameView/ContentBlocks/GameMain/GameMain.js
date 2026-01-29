import React, { Component } from "react";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

//Styles
import {
  GameMainContainer,
  GameDetailsContainer,
  GameInfoContainer,
  GameTitle,
  GameSubTitle,
  GameActions,
  GameAnalyticContainer,
} from "./styles";

//Components
import GameAnalytics from "../GameAnalytics/GameAnalytics";
import ContactIgtRep from "../../../../Dashboard/ContentBlocks/ContactIgtRep/ContactIgtRep";
import GamePhotos from "../GamePhotos/GamePhotos";
import Loading from "../../../../Loading/Loading";
import CanShow from "../../../../Authorization/CanShow/CanShow";
import GameAnalyticsConcepts from "../GameAnalytics/GameAnalyticsConcepts/GameAnalyticsConcepts";
import Catagories from "../Catagories/Catagories";

//Image Paths
import { image_paths } from "../../../../../utils/constants/image_paths";

//Fetch Data API
import { fetch_data } from "../../../../../utils/fetch_data/fetch_data";
const {
  saveFavoritesToUser,
  deleteFavoriteFromUser,
  fetchUserFavorites,
} = fetch_data;

class GameMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoading: true,
      addedToFavorites: false,
      usersFavorites: null,
      error: false,
      favoritesError: false,
      localImageName: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { gameData } = this.props;

    if (gameData === prevState.data) {
      return;
    } else {
      this.setState({ data: gameData, isLoading: false });
    }
  }

  componentDidMount() {
    const { gameId } = this.props;
    fetchUserFavorites()
      .then((favorites) => {
        if (favorites.status === 404) {
          return;
        }

        favorites.forEach((favorite) => {
          if (favorite.gameID == gameId) {
            const innerFavoriteText = document.getElementById("addToFavorites");
            const heartIcon = document.getElementById("heartIcon");

            heartIcon.style.color = "#ff682e";
            innerFavoriteText.innerText = "Remove From Favorites";
          }
        });
      })
      .catch((error) => this.setState({ error: true }));
  }

  toggleFavoritedGame = (event, gameId) => {
    const { target } = event;
    const { innerText } = target;
    const innerFavoriteText = document.getElementById("addToFavorites");
    const heartIcon = document.getElementById("heartIcon");

    switch (innerText) {
      case "REMOVE FROM FAVORITES":
        //Fetch favorites first to get the favorite ID of the target game
        fetchUserFavorites()
          .then((response) => {
            let favoriteId;
            response.forEach((res) => {
              if (res.gameID === gameId) {
                favoriteId = res.favoriteID;
              }
            });
            deleteFavoriteFromUser(favoriteId)
              .then((response) => {
                if (response.successful) {
                  heartIcon.style.color = "inherit";
                  innerFavoriteText.innerText = "Add To Favorites";
                }
              })
              .catch((error) => this.setState({ favoritesError: true }));
          })
          .catch((error) => this.setState({ favoritesError: true }));

        break;
      case "ADD TO FAVORITES":
        saveFavoritesToUser(gameId)
          .then((response) => {
            if (response.successful) {
              innerFavoriteText.innerText = "Remove From Favorites";

              heartIcon.style.color = "#ff682e";
            }
          })
          .catch((error) => this.setState({ error: true }));
        break;
      default:
        break;
    }
  };

  render() {
    const { data, isLoading } = this.state; //localImageName was removed and used during the express downloader
    const { concept } = this.props;
    const { baseImageUrl, imgBasePathConcepts } = image_paths;

    const getImagePath = () => {
      return concept
        ? imgBasePathConcepts(data.imgName)
        : baseImageUrl(data.imgName);
    };

    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <GameMainContainer>
            <GameDetailsContainer>
              <GamePhotos concept={concept} gameData={data}></GamePhotos>
              <GameInfoContainer>
                <GameTitle>{data.gameName}</GameTitle>
                <GameSubTitle>
                  {concept ? "*Proof of Concept" : ""}
                </GameSubTitle>
                <GameAnalyticContainer>
                  <CanShow
                    role={concept ? "concept" : null}
                    perform="datachart:hide"
                    yes={() => <GameAnalyticsConcepts gameData={data} />}
                    no={() => <GameAnalytics gameData={data} />}
                  />
                </GameAnalyticContainer>
                <GameActions>
                  <ul>
                    <li
                      gameid={data.gameID}
                      onClick={(e) => this.toggleFavoritedGame(e, data.gameID)}
                    >
                      <span id="heartIcon">
                        <FontAwesomeIcon icon={faHeart} />
                      </span>
                      <p id="addToFavorites">Add To Favorites</p>
                    </li>
                    <li>
                      {getImagePath() ? (
                        <a
                          href={getImagePath()}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={getImagePath()} alt="IGT Icon" />
                          <span>Download</span>
                        </a>
                      ) : null}
                    </li>
                  </ul>
                </GameActions>
                <Catagories concept={concept} gameData={data} />
              </GameInfoContainer>
            </GameDetailsContainer>
            <ContactIgtRep></ContactIgtRep>
          </GameMainContainer>
        )}
      </div>
    );
  }
}

export default GameMain;
