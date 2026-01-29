import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { AdvancedSearchPage, AdvancedSearchHeader, AdvancedSearchForm, SearchBar, SearchBtn } from './styles';

//Components
import SearchInputs from './SearchInputs/SearchInputs';
import ButtonSpinner from '../Loading/ButtonSpinner/ButtonSpinner';

//API Data Fetch
import { fetch_data } from '../../utils/fetch_data/fetch_data';
const { detailedGameSearch } = fetch_data;

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rawData: null,
      searchInput: null,
      searchParams: null,
      keywordResults: [],
      booleanResults: [],
      ticketPriceResults: [],
      indexResults: [],
      oddsResults: [],
      multiChoiceResults: [],
      redirect: false,
      searchSubmit: false,
      isLoading: false,
      redirectGameData: [],
    };

    this._isMounted = false;
  }

  searchInputOnChange = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value });
  };

  searchInputSelections = (values) => {
    debugger;
    this.setState({ searchParams: values });
  };

  handleSearchSubmit = () => {
    const { searchInput, searchParams } = this.state;

    if (searchParams || searchInput) {
      this.handleGamesSearch();
    }
  };

  handleGamesSearch = () => {
    const { searchParams, searchInput, rawData } = this.state;
    const searchValues = searchParams ? searchParams.searchValues : null;
    const gamesArray = rawData;
    let multiChoiceResult;
    let minMaxResult;

    //Keyword Search Regular Express and comparison function
    const regExKeyWordSearch = new RegExp(_.escapeRegExp(searchInput), 'i');
    const isMatch = (game) => {
      if (regExKeyWordSearch.test(game.gameName)) {
        return true;
      } else {
        return false;
      }
    };

    if (searchInput && !searchValues) {
      this.setState({ redirectGameData: _.filter(gamesArray, isMatch) }, () => {
        this.setState({ redirect: true });
      });

      return;
    }

    const multiChoiceKeysLength = Object.keys(searchValues.multiChoiceInput).length;
    const minMaxKeysLength = Object.keys(searchValues.minMaxInput).length;

    //If multi choice options are present, return sorted through results
    if (multiChoiceKeysLength !== 0) {
      let multiChoiceGames = [];
      let primaryThemeResults = [];
      let primaryPlayStyleResults = [];

      if (searchValues.multiChoiceInput.primaryColorName) {
        gamesArray.forEach((game) => {
          searchValues.multiChoiceInput.primaryColorName.forEach((color) => {
            if (searchValues.booleanInput.licensedProperty) {
              if (game.color.indexOf(color) > -1 && game.licensedProperty === searchValues.booleanInput.licensedProperty) {
                multiChoiceGames.push(game);
              }
            } else {
              if (game.color.indexOf(color) > -1) {
                multiChoiceGames.push(game);
              }
            }
          });
        });

        if (searchInput) {
          let multiChoiceSearchedWithKeyword = _.filter(multiChoiceGames, isMatch);

          multiChoiceGames = multiChoiceSearchedWithKeyword;
        }
      }

      if (searchValues.multiChoiceInput.primaryThemeName) {
        let newMultiChoiceGames = multiChoiceGames.length === 0 ? gamesArray : multiChoiceGames;

        newMultiChoiceGames.forEach((game) => {
          searchValues.multiChoiceInput.primaryThemeName.forEach((theme) => {
            if (searchValues.booleanInput.licensedProperty) {
              if (game.primaryThemeName === theme && game.licensedProperty === searchValues.booleanInput.licensedProperty) {
                primaryThemeResults.push(game);
              }
            } else {
              if (game.primaryThemeName === theme) {
                primaryThemeResults.push(game);
              }
            }

            if (searchInput) {
              let primaryThemeSearchedWithKeyword = _.filter(primaryThemeResults, isMatch);

              primaryThemeResults = primaryThemeSearchedWithKeyword;
            }
          });
        });
      }

      if (searchValues.multiChoiceInput.primaryPlayStyleName) {
        let primaryPlayStyleGames;

        if (primaryThemeResults.length === 0 && multiChoiceGames.length !== 0) {
          primaryPlayStyleGames = multiChoiceGames;
        } else if (primaryThemeResults.length === 0 && multiChoiceGames.length === 0) {
          primaryPlayStyleGames = gamesArray;
        } else if (primaryThemeResults !== 0) {
          primaryPlayStyleGames = primaryThemeResults;
        }

        primaryPlayStyleGames.forEach((game) => {
          searchValues.multiChoiceInput.primaryPlayStyleName.forEach((playStyle) => {
            if (searchValues.booleanInput.licensedProperty) {
              if (
                game.primaryPlayStyleName === playStyle &&
                game.licensedProperty === searchValues.booleanInput.licensedProperty
              ) {
                primaryPlayStyleResults.push(game);
              }
            } else {
              if (game.primaryPlayStyleName === playStyle) {
                primaryPlayStyleResults.push(game);
              }
            }

            if (searchInput) {
              let primaryPlayStyleWithKeyword = _.filter(primaryPlayStyleResults, isMatch);

              primaryPlayStyleResults = primaryPlayStyleWithKeyword;
            }
          });
        });
      }

      const primaryPlayStyleName = searchValues.multiChoiceInput.primaryPlayStyleName;
      const primaryColorName = searchValues.multiChoiceInput.primaryColorName;
      const primaryThemeName = searchValues.multiChoiceInput.primaryThemeName;

      let finalSortedGames;

      if (primaryColorName && !primaryThemeName && !primaryPlayStyleName) {
        finalSortedGames = multiChoiceGames;
      } else if (primaryThemeName && !primaryColorName && !primaryPlayStyleName) {
        finalSortedGames = primaryThemeResults;
      } else if (!primaryThemeName && !primaryColorName && primaryPlayStyleName) {
        finalSortedGames = primaryPlayStyleResults;
      } else if (primaryColorName && primaryThemeName && !primaryPlayStyleName) {
        finalSortedGames = primaryThemeResults;
      } else if (!primaryColorName && primaryThemeName && primaryPlayStyleName) {
        finalSortedGames = primaryPlayStyleResults;
      } else if (primaryColorName && primaryThemeName && primaryPlayStyleName) {
        finalSortedGames = primaryPlayStyleResults;
      } else if (!primaryColorName && !primaryThemeName && !primaryColorName) {
        finalSortedGames = null;
      }

      multiChoiceResult = finalSortedGames;
    }

    if (minMaxKeysLength !== 0) {
      const primaryPlayStyleName = searchValues.multiChoiceInput.primaryPlayStyleName;
      const primaryColorName = searchValues.multiChoiceInput.primaryColorName;
      const primaryThemeName = searchValues.multiChoiceInput.primaryThemeName;
      //results
      let ticketPriceResults = [];
      let oddsResults = [];
      let performanceScoreResults = [];

      let dataToSearch = !multiChoiceResult ? gamesArray : multiChoiceResult;

      if (!multiChoiceResult) {
        if (!primaryColorName && !primaryPlayStyleName && !primaryThemeName) {
          dataToSearch = gamesArray;
        }
        if (primaryColorName || primaryPlayStyleName || primaryThemeName) {
          return;
        }
      } else {
        dataToSearch = multiChoiceResult;
      }

      if (dataToSearch.length === 0) {
        return (minMaxResult = undefined);
      } else {
        if (searchValues.minMaxInput.ticketPrice) {
          const ticketPriceTo = searchValues.minMaxInput.ticketPrice.to;
          const ticketPriceFrom = searchValues.minMaxInput.ticketPrice.from;
          let matches = false;
          dataToSearch.forEach((game) => {
            if (searchValues.booleanInput.licensedProperty) {
              if (
                (parseInt(game.ticketPrice) >= parseInt(ticketPriceFrom) || !ticketPriceFrom) &&
                (parseInt(game.ticketPrice) <= parseInt(ticketPriceTo) || !ticketPriceTo) &&
                game.licensedProperty === searchValues.booleanInput.licensedProperty
              ) {
                matches = true;
                ticketPriceResults.push(game);
              }
            } else {
              if (
                parseInt(game.ticketPrice) >= parseInt(ticketPriceFrom) &&
                parseInt(game.ticketPrice) <= parseInt(ticketPriceTo)
              ) {
                matches = true;
                ticketPriceResults.push(game);
              }
            }

            if (searchInput) {
              let ticketPriceResultsWithKeyword = _.filter(ticketPriceResults, isMatch);

              if (ticketPriceResultsWithKeyword.length === 0) {
                matches = false;
              }

              ticketPriceResults = ticketPriceResultsWithKeyword;
            }
          });
          if (!matches) {
            ticketPriceResults = 0;
          }
        }

        if (searchValues.minMaxInput.calcOdds) {
          const oddsTo = searchValues.minMaxInput.calcOdds.to;
          const oddsFrom = searchValues.minMaxInput.calcOdds.from;
          let oddsData;

          if (!multiChoiceResult) {
            if (ticketPriceResults.length !== 0) {
              oddsData = ticketPriceResults;
            }
            if (ticketPriceResults.length === 0) {
              oddsData = gamesArray;
            }
          } else {
            oddsData = multiChoiceResult;
          }

          //Checks the ticketPriceResults for 0. If 0, then there were no returned results from the tp search. If so we stop the search.
          if (oddsData === 0) {
            return (minMaxResult = null);
          }

          let matches = false;

          oddsData.forEach((game) => {
            if (searchValues.booleanInput.licensedProperty) {
              if (
                (!oddsFrom || Number(game.odds) >= Number(oddsFrom)) &&
                (!oddsTo || Number(game.odds) <= Number(oddsTo)) &&
                game.licensedProperty === searchValues.booleanInput.licensedProperty
              ) {
                matches = true;
                oddsResults.push(game);
              }
            } else {
              if ((!oddsFrom || Number(game.odds) >= Number(oddsFrom)) && (!oddsTo || Number(game.odds) <= Number(oddsTo))) {
                matches = true;
                oddsResults.push(game);
              }
            }

            if (searchInput) {
              let oddsResultsWithKeyword = _.filter(oddsResults, isMatch);

              if (oddsResultsWithKeyword.length === 0) {
                matches = false;
              }

              oddsResults = oddsResultsWithKeyword;
            }
          });
          if (!matches) {
            oddsResults = 0;
          }
        }

        if (searchValues.minMaxInput.index) {
          const indexFrom = searchValues.minMaxInput.index.from;
          const indexTo = searchValues.minMaxInput.index.to;
          let minMaxData;

          if (ticketPriceResults === 0) {
            return (minMaxResult = null);
          }
          if (oddsResults === 0) {
            return (minMaxResult = null);
          }
          if (ticketPriceResults.length !== 0 && oddsResults.length === 0) {
            minMaxData = ticketPriceResults;
          }
          if (ticketPriceResults.length === 0 && oddsResults.length !== 0) {
            minMaxData = oddsResults;
          }
          if (ticketPriceResults.length === 0 && oddsResults.length === 0 && multiChoiceResult) {
            minMaxData = multiChoiceResult;
          }
          if (ticketPriceResults.length === 0 && oddsResults.length === 0 && !multiChoiceResult) {
            minMaxData = gamesArray;
          }
          if (ticketPriceResults.length !== 0 && oddsResults.length !== 0) {
            minMaxData = oddsResults;
          }

          if (minMaxData === 0) {
            return (oddsResults = 0);
          } else {
            let matches = false;
            minMaxData.forEach((game) => {
              if (searchValues.booleanInput.licensedProperty) {
                if (
                  (parseInt(game.index) >= parseInt(indexFrom) || !indexFrom) &&
                  (parseInt(game.index) <= parseInt(indexTo) || !indexTo) &&
                  game.licensedProperty === searchValues.booleanInput.licensedProperty
                ) {
                  matches = true;
                  performanceScoreResults.push(game);
                }
              } else {
                if (
                  (parseInt(game.index) >= parseInt(indexFrom) || !indexFrom) &&
                  (parseInt(game.index) <= parseInt(indexTo) || !indexTo)
                ) {
                  matches = true;
                  performanceScoreResults.push(game);
                }
              }

              if (searchInput) {
                let performanceScoreResultsWithKeyword = _.filter(performanceScoreResults, isMatch);

                if (performanceScoreResultsWithKeyword.length === 0) {
                  matches = false;
                }

                performanceScoreResults = performanceScoreResultsWithKeyword;
              }
            });
            if (!matches) {
              return (oddsResults = 0);
            }
          }
        }

        if (ticketPriceResults.length !== 0 && oddsResults.length === 0 && performanceScoreResults.length === 0) {
          minMaxResult = ticketPriceResults;
        }
        if (ticketPriceResults.length === 0 && oddsResults.length !== 0 && performanceScoreResults.length === 0) {
          minMaxResult = oddsResults;
        }

        if (ticketPriceResults.length === 0 && oddsResults.length === 0 && performanceScoreResults.length !== 0) {
          minMaxResult = performanceScoreResults;
        }

        if (ticketPriceResults.length !== 0 && oddsResults.length !== 0 && performanceScoreResults.length !== 0) {
          minMaxResult = performanceScoreResults;
        }

        if (ticketPriceResults.length === 0 && oddsResults.length === 0 && performanceScoreResults.length === 0) {
          minMaxResult = null;
        }
        if (ticketPriceResults.length !== 0 && oddsResults.length === 0 && performanceScoreResults.length !== 0) {
          minMaxResult = performanceScoreResults;
        }
        if (ticketPriceResults.length !== 0 && oddsResults.length !== 0 && performanceScoreResults.length === 0) {
          minMaxResult = oddsResults;
        }
        if (ticketPriceResults.length === 0 && performanceScoreResults.length !== 0 && oddsResults.length !== 0) {
          minMaxResult = performanceScoreResults;
        }
      }
    }

    if (!multiChoiceResult && minMaxResult) {
      this.setState({ redirectGameData: minMaxResult }, () => {
        this.setState({ redirect: true });
      });
    }
    if (multiChoiceResult && !minMaxResult) {
      this.setState({ redirectGameData: multiChoiceResult }, () => {
        this.setState({ redirect: true });
      });
    }
    if (!multiChoiceResult && !minMaxResult) {
      this.setState({ redirectGameData: [] }, () => {
        this.setState({ redirect: true });
      });
    }
    if (multiChoiceResult && minMaxResult) {
      this.setState({ redirectGameData: minMaxResult }, () => {
        this.setState({ redirect: true });
      });
    }
  };

  fetchSearchData = () => {
    detailedGameSearch()
      .then((response) => {
        if (this._isMounted) {
          this.setState({ rawData: response });
        }
      })
      .catch((error) => this.setState({ error: true, isLoading: false }));
  };

  componentDidMount() {
    this._isMounted = true;
    this.fetchSearchData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { searchInput, redirect, redirectGameData, isLoading, searchParams, rawData } = this.state;
    return (
      <AdvancedSearchPage>
        {redirect ? (
          <Redirect
            to={{
              pathname: '/searchresults',
              state: {
                gameData: redirectGameData,
                searchParams: searchParams,
              },
            }}
          />
        ) : null}
        <AdvancedSearchHeader>
          <h1>Advanced Search</h1>
          <p>
            Our advanced search tool helps you find the games you want, the way you want. Select from any of the options below.
          </p>
        </AdvancedSearchHeader>
        <AdvancedSearchForm>
          <SearchBar
            placeholder="Search game titles"
            name="searchInput"
            value={searchInput || ''}
            onChange={(e) => this.searchInputOnChange(e)}
          />
          <SearchInputs sendSearchSelections={this.searchInputSelections} />
          {rawData ? (
            <SearchBtn
              onClick={() => {
                this.setState({ isLoading: true }, () => {
                  this.handleSearchSubmit();
                });
              }}
            >
              {isLoading ? <ButtonSpinner color="#ffffff" size="1.2em" /> : 'Search'}
            </SearchBtn>
          ) : null}
        </AdvancedSearchForm>
      </AdvancedSearchPage>
    );
  }
}

export default withRouter(AdvancedSearch);
