import React, { Component } from 'react';

//Styles
import { InputContainer } from './styles';

//Components
import InputRender from './InputRender/InputRender';
import Loading from '../../Loading/Loading';

//API Data Fetch
import { fetch_data } from '../../../utils/fetch_data/fetch_data';
const { detailedGameSearch, gameMetadata } = fetch_data;

class SearchInputs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchData: null,
      searchOptions: null,
      isLoading: true,
      multiChoiceInput: {},
      booleanInput: {},
      minMaxInput: {}
    };

    this._isMounted = false;
  }

  //Fetch Search Data From API
  fetchSearchData = async () => {
    try {
      const searchData = await detailedGameSearch();
      return searchData;
    } catch (error) {
      this.setState({ error: true });
    }
  };

  //Fetch Metadata Object From API
  fetchSearchOptionMetadata = async () => {
    try {
      const searchOptions = await gameMetadata();
      const metadata = JSON.parse(sessionStorage.getItem('game_metadata'));
      this.setState(
        {
          searchOptions: metadata,
          isLoading: false
        },
        () => {
          return searchOptions;
        }
      );
    } catch (error) {
      this.setState({ error: true });
    }
  };

  //Resolve All Promises At Once
  resolveAsyncCallsAtOnce = async () => {
    await Promise.all([
      this.fetchSearchOptionMetadata()
      // this.fetchSearchData()
    ]).then(results => {
      if (this._isMounted) {
        if (!this.state.searchOptions) {
          this.setState({
            searchOptions: results[0]
          });
        }
      }
    });
  };

  //Stops state from being set after any running async calls are finishing
  cleanUpAsyncCalls = () => {
    this._isMounted = false;
  };

  //Handles Adding Selected Search Inputs
  //This function is passed into child InputRender.js
  addSearchFilter = event => {
    const { target } = event;
    const inputType = target.getAttribute('input-type');
    const propertyKey = target.getAttribute('input-key');

    //Handles Adding MultiChoiceInput Values
    if (inputType === 'multiChoiceInput') {
      const { multiChoiceInput } = this.state;

      if (!target.checked) {
        let stateObj = { ...multiChoiceInput };

        stateObj[propertyKey] = stateObj[propertyKey].filter(
          filter => filter !== target.name
        );

        this.setState(
          {
            multiChoiceInput: stateObj
          },
          () => {
            this.sendSearchParamsToParent();
          }
        );
      }

      if (target.checked) {
        let searchObj = {};

        let isStateEmpty = obj => {
          let objKeys = Object.keys(obj);
          if (objKeys.length !== 0) {
            return false;
          } else {
            return true;
          }
        };

        if (isStateEmpty(multiChoiceInput)) {
          searchObj[propertyKey] = [target.name];
          this.setState({ multiChoiceInput: searchObj }, () => {
            this.sendSearchParamsToParent();
          });
        } else {
          searchObj = { ...multiChoiceInput };

          if (!searchObj[propertyKey]) {
            searchObj[propertyKey] = [target.name];
          } else {
            searchObj[propertyKey].push(target.name);
          }

          this.setState({ multiChoiceInput: searchObj }, () => {
            this.sendSearchParamsToParent();
          });
        }
      }
    }

    //Handle Adding Boolean Input Values Into State
    if (inputType === 'booleanInput') {
      const { booleanInput } = this.state;
      const value = target.getAttribute('input-name');

      //First chceks if booleanInput (state) is empty, and if so we create a new object with the name of the desired property and it's chosen value.
      if (
        Object.entries(booleanInput).length === 0 &&
        booleanInput.constructor === Object
      ) {
        let newBooleanInputObject = {
          [propertyKey]: value
        };
        this.setState({ booleanInput: newBooleanInputObject }, () => {
          this.sendSearchParamsToParent();
        });
      } else {
        //If there was an existing object in state, we keep the previous object, and add create an entire new object with the new property key and value. This is to avoid mutating state.
        let state = {
          ...booleanInput,
          [propertyKey]: value
        };
        this.setState({ booleanInput: state }, () => {
          this.sendSearchParamsToParent();
        });
      }
    }
  };

  //Handles Adding Min Max Values Into State
  addMinMaxValues = async inputValueObject => {
    const { minMaxInput } = this.state;
    const propertyKey = Object.keys(inputValueObject)[0];

    try {
      if (
        Object.entries(minMaxInput).length === 0 &&
        minMaxInput.constructor === Object
      ) {
        let minMaxObject = {
          [propertyKey]: inputValueObject[propertyKey]
        };
        this.setState({ minMaxInput: minMaxObject }, () => {
          this.sendSearchParamsToParent();
        });
        return true;
      } else {
        let state = {
          ...minMaxInput,
          [propertyKey]: inputValueObject[propertyKey]
        };
        this.setState({ minMaxInput: state }, () => {
          this.sendSearchParamsToParent();
        });

        return true;
      }
    } catch (e) {
      return false;
    }
  };

  //Send Search Object To Parent
  sendSearchParamsToParent = () => {
    const { multiChoiceInput, booleanInput, minMaxInput } = this.state;
    const { sendSearchSelections } = this.props;

    const searchObject = {
      searchValues: {
        multiChoiceInput,
        booleanInput,
        minMaxInput
      }
    };

    sendSearchSelections(searchObject);
  };

  //Lifecycle Methods
  componentDidMount() {
    this.resolveAsyncCallsAtOnce();
  }

  componentWillUnmount() {
    this.cleanUpAsyncCalls();
  }
  render() {
    const { searchOptions, isLoading } = this.state;
    return (
      <InputContainer>
        {isLoading ? (
          <Loading message="Advanced Search options are loading.." />
        ) : null}
        <InputRender
          addMinMaxValues={this.addMinMaxValues}
          searchOptions={searchOptions}
          addSearchFilter={this.addSearchFilter}
        />
      </InputContainer>
    );
  }
}

export default SearchInputs;
