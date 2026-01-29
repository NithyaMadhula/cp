import React, { Component } from 'react';
import propTypes from 'prop-types';

//Styles
import { FilterGamesContainer } from './styles';

//Components
import FilterDropdown from '../FilterGames/FilterDropdown/FilterDropdown';
import FilterCrumbTrail from '../FilterGames/FilterCrumbTrail/FilterCrumbTrail';

//API
import { fetch_data } from '../../utils/fetch_data/fetch_data';

class FilterGames extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [],
      removedFilter: null,
      clickedFilter: false,
      noFilters: true,
      rawData: null,
      conceptData: props.isConceptView ? props.rawData : null, //only set when FilterGames is called from ConceptsGames.js
      dataDidNotLoad: true,
      filterProp: null,
    };
  }

  fetchAllGames = () => {
    const { detailedGameSearch, gameConcepts } = fetch_data;

    detailedGameSearch()
      .then((data) => {
        this.setState({
          dataDidNotLoad: false,
          rawData: data,
        });
      })
      .catch((e) => {
        this.setState({
          dataDidNotLoad: true,
        });
      });

    gameConcepts()
      .then((data) => {
        this.setState({
          dataDidNotLoad: false,
          conceptData: data,
        });
      })
      .catch((e) => {
        this.setState({
          dataDidNotLoad: true,
        });
      });
  };

  //Strips duplicate array values from a passed in array
  removeDuplicateValues = (filters) => {
    let unique = {};
    filters.forEach((i) => {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  };

  //Allows FilterDropdown to send back a filter selection. Builds an array from all selected filters and holds them in state until refresh
  setParentFilter = (evt) => {
    const { filters, filterProp } = this.state;
    //Evt object passed from FilterOptions.js
    //The event object is from a radio button
    const { value, checked } = evt.target;
    let filterProperty = evt.target.getAttribute('filter');

    if (filterProperty === 'colorName') {
      filterProperty = 'color';
    }
    if (filterProperty === 'primaryThemeName') {
      filterProperty = 'theme';
    }
    if (filterProperty === 'state') {
      filterProperty = 'businessName';
    }
    if (filterProperty === 'jurisdiction') {
      filterProperty = 'subDivisionCode';
    }

    //****
    if (checked) {
      //If filter array in state is empty, create an array
      if (filters.length === 0) {
        this.setState(
          {
            filters: [value],
            filterProp: [filterProperty],
          },
          () => {
            this.gameFilter();
          }
        );
      } else {
        //New array created from the current filters in state;
        let dirtyFilters = [...filters];
        let dirtyFilterProperties = [...filterProp];
        //New values added into this new array
        dirtyFilters.push(value);
        dirtyFilterProperties.push(filterProperty);
        //Set this new array back into state
        this.setState(
          {
            filters: dirtyFilters,
            filterProp: dirtyFilterProperties,
          },
          () => {
            this.gameFilter();
          }
        );
      }
    } else {
      //New array from the current filters in state;
      let dirtyFilters = [...filters];
      let cleanedFilterProperties = new Set([...filterProp]);

      //Filter the array from state to remove any unchecked values from the radio buttons
      let cleanedFilters = dirtyFilters.filter((oldValue) => oldValue !== value);

      //Set a new and now cleaned filter array back to state
      this.setState(
        {
          filters: cleanedFilters,
          filterProp: cleanedFilterProperties,
        },
        () => {
          this.gameFilter();
        }
      );
    }
    //****
  };

  //****
  //Handles filtering the raw data passed in from Games.js based on the selected filters in FilterDropdown.js. Sends back a filtered data object to Games.js
  gameFilter = () => {
    const { gamesFilter, isConceptView } = this.props;
    const { filters, filterProp, rawData, conceptData } = this.state;
    const fiilterProperties = filterProp ? new Set([...filterProp]) : [];

    //This sets the data for filtering to either concept data or normal raw data. isConceptView is a prop passed from ConceptGames.js into GameContainer.js which then passes it into FilterGames.js
    let validDataArray = isConceptView ? conceptData : rawData;

    let formatedDataArray = {
      games: [],
    };

    validDataArray.forEach((game) => {
      let gameObject = {};

      fiilterProperties.forEach((prop) => {
        gameObject.gameID = game.gameID;
        gameObject[prop] = game[prop];
      });

      formatedDataArray.games.push(gameObject);
    });

    const filterSet = new Set([...filters]);

    const matchingObjects = formatedDataArray.games.filter(({ gameID, ...game }) =>
      Object.values(game).every((value) => filterSet.has(value))
    );

    let finalGames = [];

    matchingObjects.forEach((matchedGame) => {
      validDataArray.forEach((game) => {
        if (matchedGame.gameID === game.gameID) {
          finalGames.push(game);
        }
      });
    });

    if (finalGames.length === 0) {
      finalGames = null;
    }

    gamesFilter(finalGames, filters);
  };

  //****

  //Sets a new filter array in state when the user removes a filter from the quick access view of the filters
  updateFilters = (newFilters, filterValue) => {
    this.setState(
      {
        filters: newFilters,
        removedFilter: filterValue,
      },
      () => {
        this.gameFilter();
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    const { filters, noFilters } = this.state;
    const { setFiltersSelected, rawData } = this.props;

    if (filters !== prevState.filters) {
      this.setState({ noFilters: false });
      setFiltersSelected(filters);
    }

    //Refilters new rawdata if a filter is selected
    if (rawData !== prevProps.rawData) {
      this.gameFilter();
    }

    if (!noFilters) {
      if (prevState.noFilters === noFilters) {
        this.setState({ noFilters: true });
        setFiltersSelected(filters);
      }
    }
  }

  componentWillUnmount() {
    this.setState({
      filters: [],
      removedFilter: null,
      clickedFilter: false,
      noFilters: true,
    });
  }

  componentDidMount() {
    this.fetchAllGames();
  }

  render() {
    const { filters, removedFilter } = this.state;

    return (
      <FilterGamesContainer>
        {filters.length === 0 ? null : <FilterCrumbTrail filters={filters} updateFilters={this.updateFilters} />}
        <FilterDropdown setParentFilter={this.setParentFilter} filterToUncheck={removedFilter} filtersSelected={filters} />
      </FilterGamesContainer>
    );
  }
}

FilterGames.propTypes = {
  rawData: propTypes.array.isRequired,
  gamesFilter: propTypes.func.isRequired,
  isConceptView: propTypes.bool.isRequired,
};

export default FilterGames;
