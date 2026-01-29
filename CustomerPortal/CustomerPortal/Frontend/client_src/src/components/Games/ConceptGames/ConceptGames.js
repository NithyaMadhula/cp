import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import qs from "query-string";

//Assets
import { CatalogPage, GamesPageContainer } from "../PublishedGames/styles";

//Styles
import { BackToConceptsBtn } from "./styles";
//Components
// import FeaturedGames from '../Dashboard/FeaturedGames/FeaturedGames';
import ErrorDisplay from "../../Errors/ErrorDisplay";
import Loading from "../../Loading/Loading";
import GameContainer from "../GameContainer/GameContainer";

//CSS Transition
import { CSSTransition } from "react-transition-group";

//API Data Fetch
import { fetch_data } from "../../../utils/fetch_data/fetch_data";

//CSS Trans Name
const gamesView = "games-view";

class ConceptGames extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rawData: null, //Data from API calls
      filteredData: [], //will come from FilterGames.js
      error: false, //Turns error window on and off
      isLoading: true, //Tracks intial page loading screen
      indexPage: 1, //starts at 1 with the inital data pull
      returnedGames: 96, //Amount of games to return from each API call (never changes)
      mounted: false, //Tracks initial page load to surpress lazyLoad function from firing on first render
      lazyDataIsLoading: false, //Used to pass into the <Timer /> component (not used atm),
      updateComponent: false,
      filtersSelected: null,
      showingSearchedResults: false,
      redirect: false,
    };
  }

  //Page starts at 1 on initial render.
  fetchConceptsGames = () => {
    const { gameConcepts } = fetch_data;
    const { propsData } = this.props;
    const { returnedGames, indexPage } = this.state;

    if (propsData) {
      //This statement fires if the Games.js component is loaded from Concepts.js
      this.setState({ rawData: propsData, isLoading: false });
    } else {
      //Initial data request
      gameConcepts(returnedGames, indexPage)
        .then((data) => {
          //This is how the most popular games are sorted by default on load
          //No index is for the games missing indexes. The gameIndex array is sorted numerially by index, and the the noIndex array is attached to the end of gameIndex, then returned to rawRata in state.
          let gameIndex = [];
          let noIndex = [];

          if (!data) {
            return this.setState({
              rawData: [],
              isLoading: false,
              mounted: true,
            });
          } else {
            data.forEach((game) => {
              if (game.index) {
                gameIndex.push(game);
              } else {
                noIndex.push(game);
              }
            });

            const sortIndex = (a, b) => parseInt(b.index) - parseInt(a.index);

            gameIndex.sort(sortIndex);

            let sortedData = [...gameIndex, ...noIndex];

            this.setState(
              {
                rawData: sortedData,
                isLoading: false,
                mounted: true,
              },
              () => {
                this.filterData();
              }
            );
          }
        })

        .catch((error) => this.setState({ error: true, isLoading: false }));
    }
  };

  filterGames = (filteredData, _filtersSelected) => {
    this.setState({
      filteredData,
    });
  };

  //This handles filtering passed on passed in URL parameters
  filterData = () => {
    let string = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).primaryThemeName;

    const { rawData } = this.state;

    let filteredData = [];

    if (!string) {
      return;
    }

    rawData.forEach((data) => {
      const stripSpaces = (string) => {
        let stringFormated = string.replace(/\s/g, "").toUpperCase();

        return stringFormated.replace(/\\|\//g, "");
      };

      if (stripSpaces(data.primaryThemeName) === stripSpaces(string)) {
        filteredData.push(data);
      }
    });

    if (filteredData.length === 0) {
      return setTimeout(this.setState({ noQuery: false }), 5000);
    } else {
      this.setState({
        searchBreadcrumb: string.toUpperCase(),
        filteredData,
        showingSearchedResults: true,
      });
    }
  };

  //Component mounts initially and attaches the scroll function to the window. It also calls the functon to get an intial data pull.
  componentDidMount() {
    this.fetchConceptsGames();
  }

  //When component leaves DOM, wipe the function from window.

  gamesPage = () => {
    const { rawData, filteredData, showingSearchedResults } = this.state;

    if (!rawData) {
      return;
    }

    return (
      <CatalogPage id="gamesPage">
        <h1>Concepts</h1>
        {showingSearchedResults ? (
          <BackToConceptsBtn
            onClick={() => {
              this.setState({ redirect: true }, () => {
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              });
            }}
          >
            &#171; Return To Concepts
          </BackToConceptsBtn>
        ) : null}

        <GameContainer
          updateParentGames={this.updateParentGames}
          concepts={true}
          gamesFilter={this.filterGames}
          data={rawData}
          filteredData={!filteredData ? false : filteredData}
          isConceptView={true}
          hideFilter={true}
          hideSortBy={true}
          hideToggle={true}
        />
      </CatalogPage>
    );
  };

  errorDisplay = () => {
    return (
      <CatalogPage>
        <ErrorDisplay
          message={this.errorMessage()}
          closeAction={this.refreshAfterErrorClose}
          btnText="Refresh"
        />
      </CatalogPage>
    );
  };

  errorMessage = () =>
    "There was an error loading your data. Please refresh, and if the error persists, contact IGT.";

  closeErrror = () => this.setState({ error: false });

  refreshAfterErrorClose = () => {
    this.closeErrror();
    window.location.assign(window.location.origin);
  };

  render() {
    const { error, rawData, isLoading, redirect } = this.state;
    return (
      <CSSTransition
        in={true}
        classNames={gamesView}
        timeout={300}
        unmountOnExit
      >
        {() => (
          <GamesPageContainer>
            {error ? this.errorDisplay() : null}
            {rawData ? this.gamesPage() : null}
            {isLoading ? <Loading /> : null}
            {redirect ? <Redirect to="/concepts" /> : null}
          </GamesPageContainer>
        )}
      </CSSTransition>
    );
  }
}

export default withRouter(ConceptGames);
