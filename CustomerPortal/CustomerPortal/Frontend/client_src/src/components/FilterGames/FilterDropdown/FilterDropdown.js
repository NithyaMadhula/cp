import React, { Component } from "react";
import { startCase } from "lodash";

//Styles
import {
  FilterGamesForm,
  FilterType,
  FilterDropDown,
  FilterDropDownType,
  FilterTypeMask,
  FilterOptionsContainer,
} from "./styles";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import ErrorDisplay from "../../../components/Errors/ErrorDisplay";

//Components
import FilterOptions from "../FilterOptions/FilterOptions";

//Config
// import { dropdown_options } from './config/dropdown_options';
import { filter_options } from "../FilterOptions/config/filter_search/filter_options";

//Fetch Data
import { fetch_data } from "../../../utils/fetch_data/fetch_data";
const { gameMetadata } = fetch_data;

// const { getDropdownOptionNames } = dropdown_options;

class FilterDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownShow: "",
      filterSelected: null,
      lastClicked: null,
      options: null,
      filterDropdownOptions: null,
      error: false,
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    const { getOptions } = filter_options;
    gameMetadata()
      .then((data) => {
        let options = filter_options.picked_options;
        getOptions()
          .then((data) => {
            if (this._isMounted) {
              this.setState({
                filterDropdownOptions: data,
                options,
              });
            }
          })
          .catch((error) => this.setState({ error: true }));
      })
      .catch((error) => this.setState({ error: true }));
  }

  componentWillUnmount() {
    this._isMounted = false;

    this.setState({
      dropDownShow: "",
      filterSelected: null,
      lastClicked: null,
      options: null,
      filterDropdownOptions: null,
      error: false,
    });
  }

  //Controls showing the dropdown radio inputs when clicking the dropdown menu
  showDropDown = (evt) => {
    const { lastClicked, dropDownShow } = this.state;
    const { target } = evt;
    const targetFilter = target.getAttribute("filter");
    const indexOf = [...document.getElementsByClassName("filterOptions")];

    indexOf.forEach((index) => {
      if (targetFilter === lastClicked) {
        index.style.maxHeight = "0px";
        this.setState({
          lastClicked: targetFilter,
          dropDownShow: targetFilter === dropDownShow ? "" : targetFilter,
        });
      } else if (index.id === targetFilter) {
        index.style.maxHeight = "2000px";
        index.style.overflow = "auto";
        this.setState({
          lastClicked: targetFilter,
          dropDownShow: targetFilter === dropDownShow ? "" : targetFilter,
        });
      } else {
        index.style.maxHeight = "0px";
      }
    });
  };

  caretDirection = (filter) => {
    const { dropDownShow } = this.state;
    if (dropDownShow === filter) {
      return <FontAwesomeIcon icon={faCaretUp} />;
    } else if (!dropDownShow) {
      return <FontAwesomeIcon icon={faCaretDown} />;
    } else {
      return <FontAwesomeIcon icon={faCaretDown} />;
    }
  };

  //Event argument comes from FilterOptions.js when a radio button is clicked. This is passed back into FilterGames.js via the setParentFilter() fuction passed in to props
  sendFilterToParent = (evt) => {
    const { setParentFilter } = this.props;
    setParentFilter(evt);
  };

  render() {
    const { options, error, filterDropdownOptions } = this.state;
    const { filtersSelected } = this.props;

    return (
      <FilterGamesForm>
        <h3>Filter Games</h3>
        <FilterDropDown>
          {error ? (
            <ErrorDisplay message="The filter options failed to load. Please refresh!" />
          ) : null}
          {options
            ? options.map((option, i) => {
                return (
                  <FilterDropDownType key={i}>
                    <FilterType>
                      <p>
                        {startCase(option).replace(/Primary[ ]+/g, "")}{" "}
                        {this.caretDirection(option)}
                      </p>
                      <FilterTypeMask
                        onClick={(evt) => {
                          this.showDropDown(evt);
                        }}
                        filter={option}
                      >
                        <span>{i}</span>
                      </FilterTypeMask>
                    </FilterType>
                    <FilterOptionsContainer
                      className="filterOptions"
                      id={option}
                    >
                      <FilterOptions
                        filterToUncheck={this.props.filterToUncheck}
                        setFilter={this.sendFilterToParent}
                        filterChosen={option}
                        options={filterDropdownOptions}
                        filterValuesSelected={filtersSelected}
                      />
                    </FilterOptionsContainer>
                  </FilterDropDownType>
                );
              })
            : null}
        </FilterDropDown>
      </FilterGamesForm>
    );
  }
}

export default FilterDropdown;
