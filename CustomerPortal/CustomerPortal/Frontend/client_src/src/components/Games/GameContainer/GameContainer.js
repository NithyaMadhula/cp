import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh } from '@fortawesome/free-solid-svg-icons';

//Assets
import {
  CatalogViewContainer,
  SideFilterMenu,
  SideFilters,
  CatalogCardWrapper,
  TableViewToggleContainer,
  TableViewToggle,
  CatalogViewInnerWrap,
  GameViewControls,
  SearchInputWrap,
  AdvancedSearchLink,
} from './styles';

//Components
import FilterGames from '../../FilterGames/FilterGames';
import SemanticSearch from '../SemanticSearch/SemanticSearch';
import GameCards from '../Views/GameCards/GameCards';
import GameTableView from '../Views/GameTableView/GameTableView';
import SortBy from '../SortBy/SortBy';

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortByData: null,
      sortByOptionSelected: false,
      gameTableShow: true,
      error: false, //shows if no data is sent to this component
      lazyLoadedData: false,
      refData: null,
      filteredData: null,
      initialMount: true,
      filtersSelected: [],
      currentGameTableViewData: null,
    };
  }

  setSortedData = (sortByData) => {
    this.setState({ sortByData, sortByOptionSelected: true });
  };

  gameTableShow = () => {
    this.setState((prevState) => ({
      gameTableShow: !prevState.gameTableShow,
    }));
  };

  setCurrentGameTableViewData = (data) => {
    this.setState({
      currentGameTableViewData: data,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      this.setState({ lazyLoadedData: true, refData: this.props.data });
    }
    if (this.props.data === prevState.refData) {
      this.setState({
        lazyLoadedData: false,
        refData: null,
      });
    }

    if (this.props.filteredData !== prevProps.filteredData) {
      this.setState({
        filteredData: this.props.filteredData,
      });
    }
  }

  setFiltersSelected = (filterArray) => {
    debugger;
    this.setState({ filtersSelected: filterArray });
  };

  componentWillUnmount() {
    this.setState({
      sortByData: null,
      sortByOptionSelected: false,
      gameTableShow: true,
      error: false,
      lazyLoadedData: false,
      refData: null,
      filteredData: null,
      initialMount: true,
      filtersSelected: [],
      currentGameTableViewData: null,
    });
  }

  render() {
    const { concepts, gamesFilter, data, lazyDataIsLoading, lazyLoaderDisabled, hideFilter, hideSortBy, hideToggle } = this.props;
    const { gameTableShow, sortByData, lazyLoadedData, filteredData, filtersSelected } = this.state;

    return (
      <div>
        <CatalogViewContainer>
          <GameViewControls>
            <TableViewToggleContainer></TableViewToggleContainer>
            {hideSortBy ? null : <SortBy
              data={this.state.currentGameTableViewData || data}
              rehydrate={lazyLoadedData}
              setSortedData={this.setSortedData}
            />}
            
            <SearchInputWrap>
              <SemanticSearch concepts={concepts ? 1 : 0} data={data} />
              {concepts ? null : (
                <AdvancedSearchLink>
                  <Link to="/advancedsearch">Advanced Search</Link>
                </AdvancedSearchLink>
              )}
            </SearchInputWrap>
            { hideToggle ? null : 
            <TableViewToggle onClick={this.gameTableShow}>
              <span>Toggle view</span>
              <span>
                <FontAwesomeIcon icon={faTh} />
              </span>
            </TableViewToggle>}
          </GameViewControls>
          <CatalogViewInnerWrap>
            {hideFilter ? null : <SideFilterMenu>
              <SideFilters>
                <FilterGames
                  setFiltersSelected={this.setFiltersSelected}
                  gamesFilter={gamesFilter}
                  rawData={data}
                  isConceptView={this.props.isConceptView}
                />
              </SideFilters>
            </SideFilterMenu>}
            
            <CatalogCardWrapper style={hideFilter ? { width: "100%"} : {}}>
              {gameTableShow ? (
                <GameTableView
                  concepts={concepts ? 1 : 0}
                  rawData={data}
                  sortByData={sortByData}
                  lazyData={lazyLoadedData ? data : null}
                  filteredData={filteredData}
                  lazyDataIsLoading={lazyDataIsLoading}
                  filtersSelected={filtersSelected}
                  lazyLoaderDisabled={lazyLoaderDisabled}
                  setCurrentGameTableViewData={this.setCurrentGameTableViewData}
                />
              ) : (
                <GameCards
                  concepts={concepts}
                  rawData={sortByData ? sortByData : data}
                  lazyData={lazyLoadedData ? data : null}
                  filteredData={filteredData}
                  lazyDataIsLoading={lazyDataIsLoading}
                  filtersSelected={filtersSelected}
                />
              )}
            </CatalogCardWrapper>
          </CatalogViewInnerWrap>
        </CatalogViewContainer>
      </div>
    );
  }
}

GameContainer.propTypes = {
  updateParentGames: propTypes.func,
  concepts: propTypes.bool,
  gamesFilter: propTypes.func.isRequired,
  data: propTypes.array.isRequired,
  filteredData: propTypes.oneOfType([propTypes.bool.isRequired, propTypes.array.isRequired]),
  isConceptView: propTypes.bool.isRequired,
};

export default GameContainer;
