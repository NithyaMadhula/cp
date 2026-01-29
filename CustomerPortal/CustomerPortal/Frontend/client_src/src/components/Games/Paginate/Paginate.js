import React, { Component } from 'react';

//Styles
import {
  PageNumberContainer,
  PageNumberContainerBottom,
  PageNumber,
  ArrowContainer,
  NumberWrap
} from './styles';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleDoubleLeft,
  faAngleRight,
  faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons';

class Paginate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPages: null,
      currentPage: null,
      currentPaginateDataSet: [],
      dataPerPage: 28,
      dataStartingIndex: 29, //Starts at 29 because we render to the 28th index initally in the GameView
      dataLastIndex: 0,
      currentClickedNumber: 1, //Defaults to 1st page
      pageData: null
    };
  }

  determineNumberOfPages = async () => {
    const { data } = this.props;
    const { dataPerPage } = this.state;
    let paginatedDataObject = {};

    let index = 0;
    let dataLength = data.length;
    let chunkArray = [];

    for (index = 0; index < dataLength; index += dataPerPage) {
      let newChunk = data.slice(index, index + dataPerPage);
      chunkArray.push(newChunk);
    }

    chunkArray.forEach((chunk, i) => {
      paginatedDataObject[i + 1] = chunk;
    });

    try {
      this.setState({
        totalPages: chunkArray.length,
        pageData: paginatedDataObject,
        clickedOnNumber: 1
      });
    } catch (e) {
      return false;
    }
  };

  setCurrentClickedNumber = e => {
    const { target } = e;
    this.setState({
      currentClickedNumber: parseInt(target.innerText)
    });
  };

  moveToLastPage = () => {
    this.setState({
      currentClickedNumber: this.state.totalPages,
      currentClickedPage: this.state.totalPages
    });
  };

  moveToFirstPage = () => {
    this.setState({
      currentClickedNumber: 1,
      currentClickedPage: 1
    });
  };

  moveOnePageForward = () => {
    const { dataStartingIndex, totalPages } = this.state;

    if (dataStartingIndex) {
      this.setState({
        dataStartingIndex: null,
        currentPage: 2,
        currentClickedNumber: 2
      });
    } else {
      this.setState({
        currentPage:
          this.state.currentPage + 1 > totalPages
            ? totalPages
            : this.state.currentPage + 1,
        currentClickedNumber:
          this.state.currentPage + 1 > totalPages
            ? totalPages
            : this.state.currentPage + 1
      });
    }
  };

  moveOnePageBackward = () => {
    this.setState({
      currentPage:
        this.state.currentPage - 1 < 1 ? 1 : this.state.currentPage - 1,
      currentClickedNumber:
        this.state.currentPage - 1 < 1 ? 1 : this.state.currentPage - 1
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { data, setData } = this.props;
    const { currentClickedNumber, pageData } = this.state;

    if (data !== prevProps.data) {
      this.determineNumberOfPages();
    }

    if (currentClickedNumber !== prevState.currentClickedNumber) {
      setData(pageData[currentClickedNumber]);
    }
  }

  componentWillMount() {
    this.determineNumberOfPages();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { currentClickedNumber, pageData } = this.state;
    const { setData } = this.props;
    if (nextState.pageData !== pageData) {
      setData(nextState.pageData[currentClickedNumber]);
    }
    return true;
  }

  pageNumberRender = () => {
    const { totalPages, currentClickedNumber } = this.state;
    let pages = [];
    for (let i = 1; i < totalPages + 1; i++) {
      pages.push(
        <PageNumber
          onClick={e => {
            this.setCurrentClickedNumber(e);
          }}
          isClicked={currentClickedNumber === i ? true : false}
          key={i}
        >
          {i}
        </PageNumber>
      );
    }
    return pages;
  };

  reRednderData = () => {};

  render() {
    return (
      <div>
        <PageNumberContainer>
          <ArrowContainer>
            <span>
              <FontAwesomeIcon
                onClick={this.moveToFirstPage}
                icon={faAngleDoubleLeft}
              />
            </span>
            <span>
              <FontAwesomeIcon
                onClick={this.moveOnePageBackward}
                icon={faAngleLeft}
              />
            </span>
          </ArrowContainer>
          <NumberWrap>{this.pageNumberRender()}</NumberWrap>
          <ArrowContainer>
            <span>
              <FontAwesomeIcon
                onClick={this.moveOnePageForward}
                icon={faAngleRight}
              />
            </span>
            <span>
              <FontAwesomeIcon
                onClick={this.moveToLastPage}
                icon={faAngleDoubleRight}
              />
            </span>
          </ArrowContainer>
        </PageNumberContainer>
        <PageNumberContainerBottom>
          <ArrowContainer>
            <span>
              <FontAwesomeIcon
                onClick={this.moveToFirstPage}
                icon={faAngleDoubleLeft}
              />
            </span>
            <span>
              <FontAwesomeIcon
                onClick={this.moveOnePageBackward}
                icon={faAngleLeft}
              />
            </span>
          </ArrowContainer>
          <NumberWrap>{this.pageNumberRender()}</NumberWrap>
          <ArrowContainer>
            <span>
              <FontAwesomeIcon
                onClick={this.moveOnePageForward}
                icon={faAngleRight}
              />
            </span>
            <span>
              <FontAwesomeIcon
                onClick={this.moveToLastPage}
                icon={faAngleDoubleRight}
              />
            </span>
          </ArrowContainer>
        </PageNumberContainerBottom>
      </div>
    );
  }
}

export default Paginate;
