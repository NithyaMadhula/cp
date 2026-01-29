import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//Styles
import {
  CatalogPage,
  CatalogViewContainer,
  CatalogCardWrapper,
  CatalogPageHeader
} from './styles';

//Components
import Navbar from '../../PageBase/NavigationBar/NavigationBar';
import Footer from '../../PageBase/Footer/Footer';
import GameCards from '../../Games/GameCards/GameCards';
import Loading from '../../Loading/Loading';

class AdvanceSearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: null,
      isLoading: true,
      redirect: false
    };
  }

  handleResults = () => {
    const { location } = this.props;

    if (!location.state) {
      this.setState({ redirect: true });
    } else {
      const stateKeys = Object.keys(location.state);

      let results = [];

      stateKeys.forEach(stateKey => {
        if (location.state[stateKey]) {
          results.push(location.state[stateKey]);
        }
      });

      let resultsArrayNoDups = [...new Set(results)];

      let concatResults = [].concat.apply([], resultsArrayNoDups);

      this.setState({ searchResults: concatResults, isLoading: false });
    }
  };

  componentDidMount() {
    this.handleResults();
  }

  render() {
    const { isLoading, searchResults, redirect } = this.state;
    console.log(searchResults);
    return (
      <CatalogPage>
        {redirect ? <Redirect to="/games" /> : null}
        {isLoading ? <Loading /> : null}
        <Navbar authorized={true} />
        <CatalogPageHeader>
          <h3>Advanced Search Results</h3>
        </CatalogPageHeader>
        <CatalogViewContainer>
          <CatalogCardWrapper>
            {searchResults ? <GameCards rawData={searchResults} /> : null}
          </CatalogCardWrapper>
        </CatalogViewContainer>
        <Footer />
      </CatalogPage>
    );
  }
}

export default AdvanceSearchResults;
