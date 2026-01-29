import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Styles
import {
  GameCard,
  GameCardImage,
  CardContainer,
  CardContainerWrap,
  GameCardTitle,
  MasterCardsContainer
} from './styles';

//Components
import MessagePopup from '../../MessagePopup/MessagePopup';
import Paginate from '../../Paginate/Paginate';
import CanShow from '../../../Authorization/CanShow/CanShow';

//Utils
import { image_paths } from '../../../../utils/constants/image_paths';

class GameCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoading: true,
      lastSplicedIndex: null,
      conceptsData: null,
      filteredData: false,
      dataToPaginate: [],
      dataFromPaginate: [],
      dataToLoadOnMount: []
    };

    this._isMounted = false;
  }

  //Sets the current data set from Paginate.js in state for view rendering. This functions is passed via props for use in Paginate.js
  setPaginatedData = paginateData => {
    console.log(paginateData);
    this.setState({
      dataFromPaginate: paginateData
    });
  };

  formatDate = date => {
    let removeAfter = date.indexOf('T');
    date = date.substring(0, removeAfter !== -1 ? removeAfter : date.length);

    return date;
  };

  renderGameCard = () => {
    const { concepts } = this.props;
    const { dataToLoadOnMount, dataFromPaginate } = this.state;
    const { baseImageUrl, imgBasePathConcepts } = image_paths;

    let gameData =
      dataFromPaginate.length !== 0 ? dataFromPaginate : dataToLoadOnMount;

    let cards = [];

    gameData.forEach((data, i) => {
      let imgUrl = concepts
        ? imgBasePathConcepts(data.imgName)
        : baseImageUrl(data.imgName);

      cards.push(
        <GameCard key={i - 1}>
          <GameCardImage bgImage={imgUrl} className="img"></GameCardImage>
          <GameCardTitle>{data.gameName}</GameCardTitle>
          <CanShow
            role={concepts ? 'concept' : null}
            perform="datachart:hide"
            yes={() => {
              return (
                <div className="extra">
                  <p>
                    Ticket Price: {`$${parseInt(data.ticketPrice).toFixed(0)}`}{' '}
                  </p>
                  <p>Published: False</p>
                </div>
              );
            }}
            no={() => {
              return (
                <div className="extra">
                  <p>
                    Ticket Price: {`$${parseInt(data.ticketPrice).toFixed(0)}`}{' '}
                  </p>
                  <p>Performance Score: {data.index}</p>
                  <p>Date Released: {this.formatDate(data.startDate)}</p>
                </div>
              );
            }}
          />

          <Link
            to={{
              pathname: `/viewgame/?gameid=${data.gameID}`,
              state: { gameId: data.gameID, concept: concepts }
            }}
          />
        </GameCard>
      );
    });

    return cards;
  };

  componentDidUpdate(prevProps, prevState) {
    const { rawData, filteredData } = this.props; //This is either the intial rawData array or the sortBy data array

    if (filteredData !== prevProps.filteredData) {
      this.setState({ filteredData: true, dataToPaginate: filteredData });
    }

    if (!filteredData) {
      if (prevState.dataToPaginate !== rawData) {
        this.setState({
          dataToPaginate: rawData
        });
      }
    }
  }

  componentDidMount() {
    const { rawData } = this.props;
    if (rawData) {
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    this.setState({
      error: null,
      isLoading: true,
      lastSplicedIndex: null,
      conceptsData: null,
      filteredData: false
    });

    this._isMounted = false;
  }

  shouldComponentUpdate(_nextProps, nextState) {
    if (!this.state.dataFromPaginate) {
      return false;
    } else {
      return true;
    }
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
        dataToPaginate: rawData
      });
    }
  }

  render() {
    const { isLoading, dataToPaginate } = this.state;
    const { filteredData, filtersSelected } = this.props;

    return (
      <MasterCardsContainer>
        {' '}
        <Paginate data={dataToPaginate} setData={this.setPaginatedData} />
        <CardContainerWrap>
          <MessagePopup
            filtersSelected={filtersSelected}
            filteredData={filteredData}
            message="Your filter option(s) rendered no results. Please try selecting other filters."
          />
          <CardContainer>
            {isLoading ? 'Loading..' : this.renderGameCard()}
          </CardContainer>
        </CardContainerWrap>
      </MasterCardsContainer>
    );
  }
}

export default GameCards;
