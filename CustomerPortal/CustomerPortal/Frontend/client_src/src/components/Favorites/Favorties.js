import React, { Component } from 'react';
import { withRouter } from 'react-router';

//Styles
import {
  FavoritesContainer,
  FavoritesPage,
  FavoritesPageHeader,
  SortByWrapper
} from './styles';

//Components
import FavoritesView from './FavoritesView/FavoritesView';
import SortBy from '../Games/SortBy/SortBy';

//Utils
import { fetch_data } from '../../utils/fetch_data/fetch_data';
const {
  deleteFavoriteFromUser,
  fetchUserFavorites,
  saveFavoritesToUser
} = fetch_data;

class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rawData: null,
      filteredData: [],
      error: false,
      sortByData: null
    };

    this._isMounted = false;
  }

  deleteFavorite = async favoriteId => {
    try {
      const data = await deleteFavoriteFromUser(favoriteId);
      return data;
    } catch (error) {
      this.setState({ error: true });
    }
  };

  saveFavorite = async gameId => {
    try {
      const data = await saveFavoritesToUser(gameId);
      return data;
    } catch (error) {
      this.setState({ error: true });
    }
  };

  downloadImageToDisk = async (gameName, imageUrl) => {
    const url = '/user/downloadImage';
    const body = {
      imageUrl,
      gameName
    };
    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    try {
      const response = await fetch(url, fetchConfig);
      return response.status;
    } catch (error) {
      this.setState({ error: true });
    }
  };

  setSortedData = sortByData => {
    this.setState({ sortByData, sortByOptionSelected: true });
  };

  componentDidMount() {
    this._isMounted = true;

    fetchUserFavorites()
      .then(favorites => {
        if (this._isMounted) this.setState({ rawData: favorites });
      })
      .catch(error => this.setState({ rawData: false, error: true }));
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({
      error: false
    });
  }
  render() {
    const { rawData, sortByData, error } = this.state;
    return (
      <FavoritesPage>
        <FavoritesPageHeader>
          <h1>My Favorites</h1>
        </FavoritesPageHeader>
        <SortByWrapper>
          <SortBy
            width="30%"
            data={rawData}
            rehydrate={null}
            setSortedData={this.setSortedData}
          />
        </SortByWrapper>
        <FavoritesContainer>
          <FavoritesView
            favoriteGames={sortByData ? sortByData : rawData}
            deleteFavorite={this.deleteFavorite}
            saveFavorite={this.saveFavorite}
            fetchFavorites={this.fetchFavorites}
            downloadImage={this.downloadImageToDisk}
            error={error}
          />
        </FavoritesContainer>
      </FavoritesPage>
    );
  }
}

export default withRouter(Favorites);
