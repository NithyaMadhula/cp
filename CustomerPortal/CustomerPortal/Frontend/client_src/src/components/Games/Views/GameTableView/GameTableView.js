import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

//Utils
import { handleTableSort } from './utils/sort_table_view';

//Components
import MessagePopup from '../../MessagePopup/MessagePopup';
import Paginate from '../../Paginate/Paginate';

//Styles
import { GameTableContainer, GameTable, TableLabelContainer, TableLabels, GameRow, GameRowSection } from './styles';

//Utils
import { image_paths } from '../../../../utils/constants/image_paths';

class GameTableView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      clickedGameID: null,
      filteredData: false,
      tableSortedData: false,
      currentSortValue: null, //Keeps track of what row was clicked on
      prevSortValue: null,
      toggleSort: false,
      dataToPaginate: [],
      dataFromPaginate: [],
      dataToLoadOnMount: [],
    };

    this._isMounted = false;
  }

  //Redirect function that sets redirect in state to true when a game is clicked on. It also sets the clicked on game's ID in state for use in the Redirect component in Render(). The Redirect component in Render() passes this gameID as props to the page it redirects to.
  redirectToSingleGameView = (gameID) => {
    this.setState({ redirect: true, clickedGameID: gameID });
  };

  //Sets the current data set from Paginate.js in state for view rendering. This functions is passed via props for use in Paginate.js
  setPaginatedData = (paginateData) => {
    this.setState({
      dataFromPaginate: paginateData,
    });
  };

  //Formats a game's date from an API call to a UX friendly format.
  formatDate = (date) => {
    let removeAfter = date.indexOf('T');
    date = date.substring(0, removeAfter !== -1 ? removeAfter : date.length);

    return date;
  };

  //This function controls the table sorting. It is passed as on onClick to the TableLabels found in Render()
  handleTableSort = (event, gameData, noToggle) => {
    const { currentSortValue } = this.state;

    //Handles sorting the current data set available. If there is filteredData in props from FilterGames.js, we sort that data set. Else it defaults to the rawData passed via props. FilterGames.js will pass null in as filteredData props if it has no filtered data.
    let data = this.props.filteredData ? this.props.filteredData : this.props.rawData;

    //Uses currentSortValue from state if handleTableSort() is called without the event argument
    const sortByValue = event ? event.target.innerText : currentSortValue;

    //toggleSort is set to true or false when a TableLabel is clicked consecutively. This tells the switch statement case to send a reversed sorted data set or to send a normal sorted data set.
    const { toggleSort } = this.state;

    switch (sortByValue) {
      case 'Index':
        if (toggleSort) {
          let sortedData = handleTableSort.sortToHighestInteger(data, sortByValue);

          this.setState((prevState) => ({
            tableSortedData: sortedData,
            currentSortValue: sortByValue,
            toggleSort: false,
          }));
        } else {
          let sortedData = handleTableSort.sortToLowestInteger(data, sortByValue);

          this.setState((prevState) => ({
            tableSortedData: sortedData,
            currentSortValue: sortByValue,
            toggleSort: true,
          }));
        }

        break;

      case 'Game Number':
      case 'Ticket Price':
        if (toggleSort) {
          let sortedData = handleTableSort.sortToHighestInteger(data, sortByValue);

          this.setState((prevState) => ({
            tableSortedData: sortedData,
            currentSortValue: sortByValue,
            toggleSort: false,
          }));
        } else {
          let sortedData = handleTableSort.sortToLowestInteger(data, sortByValue);

          this.setState((prevState) => ({
            tableSortedData: sortedData,
            currentSortValue: sortByValue,
            toggleSort: true,
          }));
        }
        break;

      case 'Launch Date':
        if (toggleSort) {
          let sortedData = handleTableSort.sortByMostRecentDate(data, sortByValue);

          this.setState(
            (prevState) => ({
              tableSortedData: sortedData,
              currentSortValue: sortByValue,
              toggleSort: false,
            }),
            () => {}
          );
        } else {
          let sortedData = handleTableSort.sortByFurthestDate(data, sortByValue);

          this.setState(
            (prevState) => ({
              tableSortedData: sortedData,
              currentSortValue: sortByValue,
              toggleSort: true,
            }),
            () => {}
          );
        }
        break;
      case 'Color Name':
      case 'Theme Name':
      case 'Color':
      case 'Theme':
      case 'Primary Color Name':
      case 'Secondary Color Name':
      case 'Primary Theme Name':
      case 'Secondary Theme Name':
      case 'Game Name':
      case 'State':
      case 'Printing Options':
      case 'Play Action':
      case 'Paper Stock':
        let sortedData = handleTableSort.sortByString(data, toggleSort, sortByValue);

        if (toggleSort) {
          this.setState((prevState) => ({
            tableSortedData: sortedData.reverse(),
            currentSortValue: sortByValue,
            toggleSort: false,
          }));
        } else {
          this.setState((prevState) => ({
            tableSortedData: sortedData,
            currentSortValue: sortByValue,
            toggleSort: true,
          }));
        }

        break;

      default:
        break;
    }
  };

  //This function renders the game table.
  renderGameTable = (isConcepts) => {
    let renderedGameTable = [];
    const { dataToLoadOnMount, dataFromPaginate } = this.state;
    const { baseImageUrl, imgBasePathConcepts } = image_paths;

    const replacePipe = (value) => {
      return value ? value.replace('|', ', ') : '';
    };

    let gameData = dataFromPaginate.length !== 0 ? dataFromPaginate : dataToLoadOnMount;

    gameData.forEach((game, i) => {
      //isPublished returns false if a game is not published, else returns true. This is important for calling the game image URL's as a concept has a different URL structure than a published game.
      let isPublished = () => game.isWorkingPapers || game.startDate;
      renderedGameTable.push(
        <GameRow
          bgcolor="#ffffff"
          key={i}
          onClick={() => {
            this.redirectToSingleGameView(game.gameID);
          }}
        >
          <GameRowSection width="35%">
            <img
              src={game.isWorkingPapers === 0 ? imgBasePathConcepts(game.imgName) : baseImageUrl(game.imgName)}
              alt="main game view"
              onError={(e) => {
                gameData = gameData.filter((x) => x != game);
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/60/FFF?text=%20';
              }}
              title={game.gameID || game.conceptID}
            />
            <p>{game.gameName}</p>
          </GameRowSection>
          {!isConcepts ? (
            <GameRowSection width="10%">
              <p>{game.gameNumber}</p>
            </GameRowSection>
          ) : null}
          {!isConcepts ? (
            <GameRowSection width="10%">
              <p>{game.subDivisionCode}</p>
            </GameRowSection>
          ) : null}
          <GameRowSection width="10%">
            <p>{`$${parseInt(game.ticketPrice).toFixed(0)}`}</p>
          </GameRowSection>
          {!isConcepts ? (
            <GameRowSection width="15%">
              <p>{this.formatDate(game.startDate)}</p>
            </GameRowSection>
          ) : null}
          {!isConcepts ? (
            <GameRowSection width="10%">
              <p>{game.index}</p>
            </GameRowSection>
          ) : null}

          <GameRowSection width="20%">
            <p>{replacePipe(game.theme)}</p>
          </GameRowSection>

          {isConcepts ? (
            <GameRowSection width="20%">
              <p>{replacePipe(game.playAction)}</p>
            </GameRowSection>
          ) : null}

          <GameRowSection width="20%">
            <p>{replacePipe(game.color || 'N/A')}</p>
          </GameRowSection>

          {isConcepts ? (
            <>
              <GameRowSection width="20%">
                <p>{replacePipe(game.printingOptions)}</p>
              </GameRowSection>

              <GameRowSection width="20%">
                <p>{replacePipe(game.paperStock || 'N/A')}</p>
              </GameRowSection>
            </>
          ) : null}
          {!isConcepts ? (
            <GameRowSection width="20%">
              <p>{replacePipe(game.playStyle)}</p>
            </GameRowSection>
          ) : null}
          {!isConcepts ? (
            <GameRowSection width="20%">
              <p>{replacePipe(game.feature)}</p>
            </GameRowSection>
          ) : null}
        </GameRow>
      );
    });

    return renderedGameTable;
  };

  componentDidUpdate(prevProps, prevState) {
    const { tableSortedData, dataToPaginate } = this.state;
    const { filteredData, rawData, sortByData } = this.props;

    if (rawData) {
      // console.log('fd', filteredData);
      // console.log('tsd', tableSortedData);
      //Handles assigning a data set to one property in state named gameData. gameData will be piped into paginate in render() so that component can handle what data views to send back.
      //There are 3 possible datasets:

      //tableSortedData: this data set comes from the table sort. It handles both filtered and raw data sets and returns back the sorted data. It takes 1st priority over any data set since this data set is created from either rawData or filteredData.
      //filteredData: this data set originates from FilterGames.js. It takes a 2nd priorty to the other two. Meaning if we have both rawData and filteredData, we choose filteredData. FilterGames filters games from rawData.
      //rawData: this is 3rd priorty. It is the raw data set that comes from Games.js. It is the default data when the component loads.

      //***  ***/

      //Everytime the dataToPaginate property is updated in state, we send that data back to GameContiner so that it can be passed as props into the SortBy.js component.
      if (dataToPaginate) {
        if (prevState.dataToPaginate !== dataToPaginate) {
          this.props.setCurrentGameTableViewData(dataToPaginate);
        }
      }

      //If there is tableSortedData avilable as well as filteredData, we want to set dataToPaginate as tableSortedData. Since handleTableSort() can switch between filteredData and rawData, we know that if there is tableSortedData, that it sorted the current filteredData set.
      if (tableSortedData && filteredData) {
        if (prevState.tableSortedData !== tableSortedData) {
          this.setState({
            dataToPaginate: tableSortedData,
          });
        }

        if (prevProps.filteredData !== filteredData) {
          this.setState({
            dataToPaginate: filteredData,
          });
        }
      }

      //If there is filteredData but no tableSortedData, we set dataToPaginate as filteredData.
      if (filteredData && !tableSortedData) {
        if (dataToPaginate !== filteredData) {
          this.setState({
            dataToPaginate: filteredData,
          });
        }
      }

      //If we have no filteredData or tableSortedData and the previous filteredData props do not equal the current filteredData props, we know to set the data back to rawData. Only when all of the filters are deselected, FilterGames will return the current filteredData props as null. This is how we know all filters were removed and it is okay to fall back to the default rawData.
      if (!filteredData && !tableSortedData) {
        if (prevProps.filteredData !== filteredData) {
          this.setState({
            dataToPaginate: handleTableSort.sortToHighestInteger(rawData, 'index'),
          });
        }
      }

      //This is neccessary, but has no explination.
      if (!filteredData && tableSortedData) {
        if (tableSortedData !== filteredData) {
          this.setState({
            dataToPaginate: handleTableSort.sortToHighestInteger(rawData, 'index'),
            tableSortedData: null,
          });
        }
      }

      //This handles setting tableSorted data when there is no filteredData present. This means we are table sorting the default rawData.
      if (!filteredData && tableSortedData) {
        if (prevState.dataToPaginate !== tableSortedData) {
          this.setState({
            dataToPaginate: tableSortedData,
          });
        }
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillMount() {
    //This handles setting up the intial 1st page data view before the component mounts via initialArray. It also sets the rawData to dataToPaginate so the Paginate.js component can determine number of pages possible and which data set to show for each page. initialArray is only needed on initial mount because Paginate.js can only send that initial data set back after GameTableView mounts, and since we can't mount GameTableView with no data view, this is the solution.
    const { rawData } = this.props;
    this._isMounted = true;
    let intialArray = [];
    rawData.forEach((game, i) => {
      if (i <= 28) {
        intialArray.push(game);
      }
    });

    if (this._isMounted) {
      this.setState({
        dataToLoadOnMount: intialArray,
        dataToPaginate: rawData,
      });
    }
  }

  render() {
    const { redirect, clickedGameID, dataToPaginate } = this.state;
    const { concepts, filtersSelected, filteredData } = this.props;

    let isConcept = () => (concepts === 1 ? true : false);

    return (
      <GameTableContainer>
        {redirect ? (
          <Redirect
            push
            to={{
              pathname: `/viewgame/?gameid=${clickedGameID}`,
              state: {
                gameId: clickedGameID,
                concept: concepts ? true : false,
              },
            }}
          />
        ) : null}

        <GameTable>
          <Paginate data={dataToPaginate} setData={this.setPaginatedData} />
          <TableLabelContainer>
            <TableLabels onClick={(e) => this.handleTableSort(e, null, true)} width="35%">
              Game Name
              <span>
                <FontAwesomeIcon icon={faSort} />
              </span>
            </TableLabels>

            {isConcept() ? null : (
              <TableLabels onClick={(e) => this.handleTableSort(e, null, true)} width="10%">
                Game Number
                <span>
                  <FontAwesomeIcon icon={faSort} />
                </span>
              </TableLabels>
            )}

            {isConcept() ? null : (
              <TableLabels onClick={(e) => this.handleTableSort(e, null, true)} width="10%">
                State
                <span>
                  <FontAwesomeIcon icon={faSort} />
                </span>
              </TableLabels>
            )}

            <TableLabels onClick={(e) => this.handleTableSort(e, null, true)} width="10%">
              Ticket Price
              <span>
                <FontAwesomeIcon icon={faSort} />
              </span>
            </TableLabels>

            {isConcept() ? null : (
              <TableLabels onClick={(e) => this.handleTableSort(e, null, true)} width="15%">
                Launch Date
                <span>
                  <FontAwesomeIcon icon={faSort} />
                </span>
              </TableLabels>
            )}

            {isConcept() ? null : (
              <TableLabels onClick={(e) => this.handleTableSort(e, null, true)} width="10%">
                Index
                <span>
                  <FontAwesomeIcon icon={faSort} />
                </span>
              </TableLabels>
            )}

            <TableLabels onClick={(e) => this.handleTableSort(e, null, true)} width="20%">
              Theme
              <span>
                <FontAwesomeIcon icon={faSort} />
              </span>{' '}
            </TableLabels>

            {isConcept() ? (
              <>
                <TableLabels onClick={(e) => this.handleTableSort(e, null, true)} width="20%">
                  Play Action
                  <span>
                    <FontAwesomeIcon icon={faSort} />
                  </span>
                </TableLabels>

                <TableLabels onClick={(e) => this.handleTableSort(e, null, true)} width="20%">
                  Paper Stock
                  <span>
                    <FontAwesomeIcon icon={faSort} />
                  </span>
                </TableLabels>
              </>
            ) : null}

            <TableLabels onClick={(e) => this.handleTableSort(e, null, true)} width="20%">
              Color
              <span>
                <FontAwesomeIcon icon={faSort} />
              </span>
            </TableLabels>

            {isConcept() ? (
              <TableLabels onClick={(e) => this.handleTableSort(e, null, true)} width="20%">
                Printing Options
                <span>
                  <FontAwesomeIcon icon={faSort} />
                </span>
              </TableLabels>
            ) : null}

            {isConcept() ? null : (
              <TableLabels onClick={(e) => this.handleTableSort(e, null, true)} width="20%">
                Play Style
                <span>
                  <FontAwesomeIcon icon={faSort} />
                </span>
              </TableLabels>
            )}
            
            {isConcept() ? null : (
              <TableLabels onClick={(e) => this.handleTableSort(e, null, true)} width="20%">
                Feature
                <span>
                  <FontAwesomeIcon icon={faSort} />
                </span>
              </TableLabels>
            )}

            {/* Game Name, Price, Theme, Play Action, Color, Printing Options, Ticket Stock */}
          </TableLabelContainer>
          <MessagePopup
            filtersSelected={filtersSelected}
            filteredData={filteredData}
            message="Your filter option(s) rendered no results. Please try selecting other filters."
          />
          {this.renderGameTable(isConcept())}
        </GameTable>
      </GameTableContainer>
    );
  }
}

export default GameTableView;
