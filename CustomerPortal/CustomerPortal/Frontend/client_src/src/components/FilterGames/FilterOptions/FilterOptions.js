import React, { Component } from 'react';

//Styles
import {} from './styles';

//Components
import FilterOptionInputs from './FilterOptionsInputs/FilterOptionInputs';
import ErrorDisplay from '../../../components/Errors/ErrorDisplay';

export default class FilterOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options,
      error: false,
      mounted: false
    };

    this.mounted = true;
  }

  uncheckBox = filterToUncheck => {
    //If no filter has been deselected, nothing happens
    if (!filterToUncheck) {
      return;
    }

    //If there is a selected filter to uncheck, pull all the input buttons and uncheck if it matches the passed in filterToUncheck arg
    let raw_buttons = document.getElementsByClassName('filterRadioButton');
    let buttons = [...raw_buttons];

    buttons.forEach(button => {
      if (button.name === filterToUncheck) {
        button.checked = false;
      }
    });
  };

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  handleTicketPriceFormating = options => {
    // console.log(options.ticketPrice);
  };

  render() {
    const {
      filterChosen,
      setFilter,
      filterToUncheck,
      filterValuesSelected
    } = this.props;
    const { options, error } = this.state;
    let filterArr = options ? options[filterChosen] : null;

    this.uncheckBox(filterToUncheck);
    return (
      <div>
        {error ? (
          <ErrorDisplay message="There was an error loading the options. Please refresh and try again." />
        ) : null}
        {options ? (
          <FilterOptionInputs
            setFilter={setFilter}
            filterArray={filterArr}
            filterChosen={filterChosen}
            filterValuesSelected={filterValuesSelected}
          />
        ) : null}
      </div>
    );
  }
}
