import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh } from '@fortawesome/free-solid-svg-icons';

//Components
import GameContainer from '../../Games/GameContainer/GameContainer';
import GameTableView from '../../Games/Views/GameTableView/GameTableView';
import NoResults from '../NoResults/NoResults';
import SortBy from '../../Games/SortBy/SortBy';
import SemanticSearch from '../../Games/SemanticSearch/SemanticSearch';

//Styles//
import {
  SearchResultsContainer,
  GameViewControls,
  GameViewControlsWrap,
  SearchInputWrap,
  AdvancedSearchLink,
  TableViewToggle
} from './styles';

class SearchResultsDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortByData: null,
      gameTableShow: true
    };
  }

  setCurrentGameTableViewData = (data) => {
    this.setState({
      currentGameTableViewData: data,
    });
  };

  render() {
    const { location } = this.props;
    const { state } = location;
    const { gameData, searchParams } = state;

    return (
      <div>
        <GameContainer data={gameData} lazyLoaderDisabled={true} hideFilter={true} hideToggle={true}/>
        {/* <SearchResultsContainer>
          <h1>Search Results</h1>
          <GameViewControlsWrap>
            <GameViewControls>
              <SortBy />
              <SearchInputWrap>
                <SemanticSearch />
                <AdvancedSearchLink>
                  <Link to="/advancedsearch">Advanced Search</Link>
                </AdvancedSearchLink>
              </SearchInputWrap>
              <TableViewToggle onClick={() => {}}>
                <span>Toggle view</span>
                <span>
                  <FontAwesomeIcon icon={faTh} />
                </span>
              </TableViewToggle>
            </GameViewControls>
          </GameViewControlsWrap>
          {gameData.length === 0 ? (
            <NoResults />
          ) : (
            
            // <GameTableView rawData={gameData} lazyLoaderDisabled={true}  />
          )}
        </SearchResultsContainer> */}
      </div>
    );
  }
}

export default withRouter(SearchResultsDisplay);
