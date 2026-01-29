import React, { Component } from 'react';
import { withRouter } from 'react-router';

//Assets
import { CatalogPage, GamesPageContainer } from './styles';

//Components
import ErrorDisplay from '../../Errors/ErrorDisplay.js';
import Loading from '../../Loading/Loading';
import GameContainer from '../GameContainer/GameContainer';
import GamesSearch from "../../Search/GamesSearch";

//CSS Transition
import { CSSTransition } from 'react-transition-group';

//API Data Fetch
import { fetch_data } from '../../../utils/fetch_data/fetch_data';

// *****
import { userAuth } from '../../../authentication/authentication';
import { fetch_config } from '../../../utils/fetch_config/config';
import { api_endpoints } from '../../../utils/constants/api_endpoints';
import { image_paths } from '../../../utils/constants/image_paths';

const { baseImageUrl, imgBasePathConcepts } = image_paths;
const { getUserToken } = userAuth;
const { post } = fetch_config;
const { IGT_API } = api_endpoints;
// *****

//CSS Trans Name
const gamesView = 'games-view';

class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rawData: null, //Data from API calls
      filteredData: [], //will come from FilterGames.js
      error: false, //Turns error window on and off
      isLoading: true, //Tracks intial page loading screen
      indexPage: 1, //starts at 1 with the inital data pull
      returnedGames: 128, //Amount of games to return from each API call (never changes)
      mounted: false, //Tracks initial page load to surpress lazyLoad function from firing on first render
      lazyDataIsLoading: false, //Used to pass into the <Timer /> component (not used atm),
      updateComponent: false,
      filtersSelected: null,
      lotteries: []
    };
  }

  //Fetch /detailedgmaesearch Endpoint
  //Page starts at 1 on initial render.
  fetchDetailedGameSearchEndpoint = () => {
    const { detailedGameSearch } = fetch_data;
    const { propsData } = this.props;

    if (propsData) {
      //This statement fires if the Games.js component is loaded from Concepts.js
      this.setState({ rawData: propsData, isLoading: false });
    } else {

      //Initial data request
      detailedGameSearch()
        .then(data => {
          //This is how the most popular games are sorted by default on load
          //No index is for the games missing indexes. The gameIndex array is sorted numerially by index, and the the noIndex array is attached to the end of gameIndex, then returned to rawRata in state.
          let gameIndex = [];
          let noIndex = [];

          if (!data) {
            return this.setState({
              rawData: [],
              isLoading: false,
              mounted: true
            });
          } else {
            data.forEach(game => {
              if (game.index) {
                gameIndex.push(game);
              } else {
                noIndex.push(game);
              }
            });

            const sortIndex = (a, b) => parseInt(b.index) - parseInt(a.index);

            gameIndex.sort(sortIndex);

            let sortedData = [...gameIndex, ...noIndex];

            this.setState({
              rawData: sortedData,
              isLoading: false,
              mounted: true
            });
          }
        })

        .catch(error => this.setState({ error: true }));
      // .catch(error => this.setState({ error: true, isLoading: false }));
    }
  };

  handleLazyLoadData = () => {
    const { indexPage } = this.state;

    const { token } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/detailedgamesearch`;
    const body = {
      yearType: 0,
      pageIndex: indexPage,
      pageSize: 60
    };

    //Anything inside this fetch is async and awaiting response. This is where the API call happens. For now this is not updating state on return, it's console logging the returned data to show it loaded.
    this.setState(
      {
        lazyDataIsLoading: true
      },
      () => {
        fetch(url, post(token, body))
          .then(data => data.json())
          .then(res => {
            const { rawData } = this.state;
            let newStateArr = [...rawData];
            let combinedData = [...newStateArr, ...res];

            this.setState({ lazyDataIsLoading: false, rawData: combinedData });
          })
          .catch(error => this.setState({ error: true }));
      }
    );
  };

  filterGames = (filteredData, _filtersSelected) => {
    this.setState({
      filteredData
    });
  };

  handleScrollLoading = event => {
    const { indexPage, mounted } = this.state;

    //Does not load data if page is first mounted (mounted goes to true once the window hits bottom for the first time. found on L.146)
    //If props.data.concepts, the component is being called from Concepts.js. We do not want to load concepts data like this for now, so we return and do nothing. Lazy loading is Published Games only right now.
    if (!mounted || this.props.concepts) {
      return;
    }

    let scrolledWindowPos =
      window.innerHeight + document.documentElement.scrollTop;

    let documentHeight = document.documentElement.scrollHeight;

    //If the page is at the bottom, this is satisfied and runs.
    if (scrolledWindowPos === documentHeight) {
      //Keeps up with what the last pageIndex was, so when the user scrolls back to bottom, it continues where they left off. This is held in state and passed into every lazy loaded API call dymanically to get the right page.
      this.setState(
        {
          indexPage: indexPage + 1
        },
        () => {
          this.handleLazyLoadData();
        }
      );
    }
  };

  //Component mounts initially and attaches the scroll function to the window. It also calls the functon to get an intial data pull.
  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollLoading);
    this.fetchDetailedGameSearchEndpoint();
  }

  //When component leaves DOM, wipe the function from window.
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollLoading);
  }

  gamesPage = () => {
    const { rawData, filteredData } = this.state;
    const { concepts } = this.props;

    if (!rawData) {
      return;
    }
    return (
      <CatalogPage id="gamesPage">
        <h1>Games</h1>
        {/* <GamesSearch data={rawData} imageUrl={imgBasePathConcepts} baseImageUrl={baseImageUrl}/> */}

        <GameContainer
          updateParentGames={this.updateParentGames}
          concepts={concepts}
          gamesFilter={this.filterGames}
          data={rawData}
          filteredData={!filteredData ? null : filteredData}
          isConceptView={false}
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
    'There was an error loading your data. Please refresh, and if the error persists, contact IGT.';

  closeErrror = () => this.setState({ error: false });

  refreshAfterErrorClose = () => {
    this.closeErrror();
    window.location.reload();
  };

  render() {
    const { error, rawData, isLoading } = this.state;

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
          </GamesPageContainer>
        )}
      </CSSTransition>
    );
  }
}

export default withRouter(Games);
