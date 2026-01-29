import React, { Component } from 'react';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

//Styles
import {
  SortByContainer,
  SortBySelect,
  SortByMenu,
  SortByMenuOption
} from './styles';

//Auth
import { userAuth } from '../../../authentication/authentication';
const { getUserToken } = userAuth;

class SortBy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedData: null,
      originalData: null, //Saved in state to pass back if error on sort
      sortMenuOpen: false,
      sortMenuSelectedValue: null,
      rehydrate: false
    };
  }

  setSelectedValue = event => {
    const { target } = event;

    if (target.innerText === 'Default') {
      this.setState({ sortMenuSelectedValue: null });
    } else {
      this.setState({ sortMenuSelectedValue: target.innerText });
    }

    this.toggleSortByMenuVisbility();
  };

  toggleSortByMenuVisbility = () => {
    this.setState(prevState => ({
      sortMenuOpen: !prevState.sortMenuOpen
    }));
  };

  sortByDate = () => {
    const { data, setSortedData } = this.props;

    const sortRecentDate = (a, b) => {
      const newDate = date => new Date(date).getTime();

      return newDate(b.startDate) - newDate(a.startDate);
    };
    let sortedDate = [...data.sort(sortRecentDate)];

    setSortedData(sortedDate);
  };

  // NEED TO SET THE NEW DATA TO STATE AND LET THE COMPONENT SORT WITH STATE

  sortByPerformanceScore = () => {
    const { data, setSortedData } = this.props;

    let gamePerformanceScore = [];
    let noPerformanceScore = [];

    data.forEach(game => {
      if (game.index) {
        gamePerformanceScore.push(game);
      } else {
        noPerformanceScore.push(game);
      }
    });

    const performanceScoreSort = (a, b) =>
      parseInt(b.index) - parseInt(a.index);

    gamePerformanceScore.sort(performanceScoreSort);

    let sortedData = [...gamePerformanceScore, ...noPerformanceScore];

    setSortedData(sortedData);
  };

  sortByLowestTicketPrice = () => {
    const { data, setSortedData } = this.props;

    const performanceScoreSort = (a, b) => {
      let aPrice = parseInt(a.ticketPrice.replace('$', ''));
      let bPrice = parseInt(b.ticketPrice.replace('$', ''));

      return parseInt(aPrice) - parseInt(bPrice);
    };

    data.sort(performanceScoreSort);

    setSortedData([...data]);
  };

  sortByHighestTicketPrice = () => {
    const { data, setSortedData } = this.props;

    const performanceScoreSort = (a, b) => {
      let aPrice = parseInt(a.ticketPrice.replace('$', ''));
      let bPrice = parseInt(b.ticketPrice.replace('$', ''));

      return parseInt(bPrice) - parseInt(aPrice);
    };

    data.sort(performanceScoreSort);

    setSortedData([...data]);
  };

  sortByString = sortByValue => {
    const { data, setSortedData } = this.props;

    let primarySortOptions = [];
    let sortedDataArray = [];

    data.forEach(data => {
      primarySortOptions.push(data[sortByValue]);
    });

    let strippedDuplicates = [...new Set(primarySortOptions)];

    strippedDuplicates.forEach(sortOption => {
      data.forEach(data => {
        if (data[sortByValue] === sortOption) {
          sortedDataArray.push(data);
        }
      });
    });

    setSortedData([...sortedDataArray]);
  };

  sortByCustomerState = () => {
    const { customer } = getUserToken();
    const { data, setSortedData } = this.props;

    let sameCustomerState = [];
    let notCustomerState = [];

    data.forEach(data => {
      if (data.subDivisionCode === customer) {
        sameCustomerState.push(data);
      } else {
        notCustomerState.push(data);
      }
    });

    let combinedDataSets = [...sameCustomerState, ...notCustomerState];

    setSortedData(combinedDataSets);
  };

  handleRehydrationAutomaticSort = () => {
    const { sortMenuSelectedValue } = this.state;

    switch (sortMenuSelectedValue) {
      case 'Default':
      case 'Index':
        this.sortByPerformanceScore();
        break;

      case 'Highest Ticket Price':
        this.sortByHighestTicketPrice();
        break;

      case 'Lowest Ticket Price':
        this.sortByLowestTicketPrice();
        break;

      case 'Release Date':
        this.sortByDate();
        break;

      case 'Primary Theme':
      case 'Primary Color':
        this.sortByString(sortMenuSelectedValue);
        break;

      case 'Your State':
        this.sortByCustomerState();
        break;

      default:
        return;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { sortMenuSelectedValue } = this.state;

    if (sortMenuSelectedValue) {
      if (this.props.rehydrate === prevState.rehydrate) {
        return;
      }

      if (this.props.rehydrate) {
        this.setState({ rehydrate: true });
        this.handleRehydrationAutomaticSort();
      }
    }
  }

  render() {
    const { sortMenuOpen, sortMenuSelectedValue } = this.state;
    return (
      <SortByContainer width={this.props.width}>
        <SortBySelect onClick={this.toggleSortByMenuVisbility}>
          {sortMenuSelectedValue ? sortMenuSelectedValue : 'Sort by:'}
          <span>
            <FontAwesomeIcon icon={faSort} />
          </span>
        </SortBySelect>
        <SortByMenu isMenuOpen={sortMenuOpen}>
          <SortByMenuOption
            onClick={e => {
              this.setSelectedValue(e);
              this.sortByPerformanceScore();
            }}
          >
            Default
          </SortByMenuOption>
          <SortByMenuOption
            onClick={e => {
              this.setSelectedValue(e);
              this.sortByPerformanceScore();
            }}
          >
            Index
          </SortByMenuOption>
          <SortByMenuOption
            onClick={e => {
              this.setSelectedValue(e);
              this.sortByHighestTicketPrice();
            }}
          >
            Highest Ticket Price
          </SortByMenuOption>
          <SortByMenuOption
            onClick={e => {
              this.setSelectedValue(e);
              this.sortByLowestTicketPrice();
            }}
          >
            Lowest Ticket Price
          </SortByMenuOption>
          <SortByMenuOption
            onClick={e => {
              this.setSelectedValue(e);
              this.sortByDate();
            }}
          >
            Release Date
          </SortByMenuOption>
          <SortByMenuOption
            onClick={e => {
              this.setSelectedValue(e);
              this.sortByString('primaryThemeName');
            }}
          >
            Primary Theme
          </SortByMenuOption>
          {/* <SortByMenuOption
            onClick={e => {
              this.setSelectedValue(e);
              this.sortByString('primaryColorName');
            }}
          >
            Primary Color
          </SortByMenuOption> */}
        </SortByMenu>
      </SortByContainer>
    );
  }
}

export default SortBy;
