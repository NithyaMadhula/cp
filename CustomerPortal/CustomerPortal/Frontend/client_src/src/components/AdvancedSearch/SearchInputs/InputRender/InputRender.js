import React, { Component } from 'react';

import { search_inputs } from '../config/search_inputs';

import {
  InputBox,
  InputBoxHeader,
  InputOptionContainer,
  InputMinMaxContainer
} from '../styles';

class InputRender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchOptionObject: null,
      ticketPriceTo: '',
      ticketPriceFrom: '',
      calcOddsTo: '',
      calcOddsFrom: '',
      indexTo: '',
      indexFrom: '',
      setTicketPrice: false,
      setOdds: false,
      setIndex: false
    };
  }

  //Update Input Values In State
  updateInputValue = event => {
    const { target } = event;
    const { name, value } = target;

    this.setState({
      [name]: value
    });
  };

  removeMinMaxFromParent = property => {
    const { addMinMaxValues } = this.props;

    switch (property) {
      case 'ticketPrice':
        this.setState(
          {
            ticketPriceFrom: '',
            ticketPriceTo: '',
            setTicketPrice: false
          },
          () => {
            addMinMaxValues({
              [property]: {}
            });
          }
        );
        break;
      case 'calcOdds':
        this.setState(
          {
            calcOddsFrom: '',
            calcOddsTo: '',
            setOdds: false
          },
          () => {
            addMinMaxValues({
              [property]: {}
            });
          }
        );
        break;
      case 'index':
        this.setState(
          {
            indexFrom: '',
            indexTo: '',
            setIndex: false
          },
          () => {
            addMinMaxValues({
              [property]: {}
            });
          }
        );
        break;
      default:
        break;
    }
  };

  //Send Min Max Input Object To Parent (SearchInput.js)
  sendMinMaxToParent = property => {
    const { addMinMaxValues } = this.props;
    const {
      ticketPriceFrom,
      ticketPriceTo,
      calcOddsFrom,
      calcOddsTo,
      indexTo,
      indexFrom
    } = this.state;

    switch (property) {
      case 'ticketPrice':
        const ticketPricesSelected = {
          [property]: {
            to: ticketPriceTo,
            from: ticketPriceFrom
          }
        };
        addMinMaxValues(ticketPricesSelected).then(res => {
          if (res) {
            this.setState({
              setTicketPrice: true
            });
          }
        });
        break;
      case 'index':
        const indexScoresSelected = {
          [property]: {
            to: indexTo,
            from: indexFrom
          }
        };
        addMinMaxValues(indexScoresSelected).then(res => {
          if (res) {
            this.setState({
              setIndex: true
            });
          }
        });
        break;
      case 'calcOdds':
        const oddsSelected = {
          [property]: {
            to: calcOddsTo,
            from: calcOddsFrom
          }
        };
        addMinMaxValues(oddsSelected).then(res => {
          if (res) {
            this.setState({
              setOdds: true
            });
          }
        });
        break;

      default:
        break;
    }
  };

  //Generate Inputs Dynamically
  generateInputObjects = () => {
    const { searchOptions } = this.props;
    const { booleanProperties, inputMinMax } = search_inputs;

    let searchOptionObject = {
      booleanProperties: [],
      inputMinMax: [],
      multiChoice: []
    };

    const searchOptionProperties = Object.keys(searchOptions);

    //Generates Boolean and Min Max input objects
    searchOptionProperties.forEach(searchOptionProperty => {
      let optionPropertyValueArray = searchOptions[searchOptionProperty];

      booleanProperties.forEach(boolProp => {
        if (searchOptionProperty === boolProp) {
          let booleanValueObject = {
            [searchOptionProperty]: optionPropertyValueArray
          };
          searchOptionObject.booleanProperties.push(booleanValueObject);
        }
      });

      inputMinMax.forEach(minMaxProp => {
        if (searchOptionProperty === minMaxProp) {
          let inputMinMaxObject = {
            [searchOptionProperty]: optionPropertyValueArray
          };
          searchOptionObject.inputMinMax.push(inputMinMaxObject);
        }
      });
    });

    //Hard Coded Multi-choice object
    //IGT API does not return many properties, this is fine for now.
    searchOptionObject.multiChoice.push(
      {
        primaryColorName: searchOptions.primaryColorName
      },
      {
        primaryThemeName: searchOptions.primaryThemeName
      },
      { primaryPlayStyleName: searchOptions.primaryPlayStyleName }
    );

    //Sends the newly created input options object off to the factory to be consumed
    this.setState({ searchOptionObject });
  };

  //Render Input Objects
  renderAdvancedSearchInputs = () => {
    const {
      searchOptionObject,
      setTicketPrice,
      setIndex,
      setOdds
    } = this.state;
    const { addSearchFilter } = this.props;

    let renderedInputs = [];

    const returnStringFromCamelCase = string => {
      const regExResult = string.replace(/([A-Z])/g, ' $1');
      const formatedResult =
        regExResult.charAt(0).toUpperCase() + regExResult.slice(1);

      return formatedResult;
    };

    //Render MinMax Inputs
    searchOptionObject.inputMinMax.forEach((prop, i) => {
      const propKey = Object.keys(prop)[0];

      renderedInputs.push(
        <InputBox key={propKey + i + i}>
          <InputBoxHeader>{returnStringFromCamelCase(propKey)}</InputBoxHeader>

          <InputMinMaxContainer key={propKey + i}>
            <input
              className="minMaxInput"
              input-type="minMaxInput"
              input-key={propKey}
              type="number"
              name={propKey + 'From'}
              placeholder={`eg. 1.00`}
              value={this.state[`${propKey}From`]}
              onChange={evt => {
                this.updateInputValue(evt);
              }}
              required
            />
            <p>to</p>
            <input
              className="minMaxInput"
              input-type="minMaxInput"
              input-key={propKey}
              type="number"
              name={propKey + 'To'}
              placeholder={`eg. 20.00`}
              value={this.state[`${propKey}To`]}
              onChange={evt => {
                this.updateInputValue(evt);
              }}
              required
            />
            <button
              className={setTicketPrice ? 'setButton' : null}
              type="button"
              onClick={() => {
                !setTicketPrice
                  ? this.sendMinMaxToParent(`${propKey}`)
                  : this.removeMinMaxFromParent(`${propKey}`);
              }}
            >
              {setTicketPrice ? 'Remove' : 'Set Values'}
            </button>
          </InputMinMaxContainer>
        </InputBox>
      );
    });

    //Render MinMax Inputs That Are Not In the IGT API (BUT WILL BE WANTED)
    //Render Index (Performance Score)
    renderedInputs.push(
      <InputBox key="index">
        <InputBoxHeader>Performance Score</InputBoxHeader>

        <InputMinMaxContainer>
          <input
            className="minMaxInput"
            input-type="minMaxInput"
            input-key="index"
            type="number"
            name="indexFrom"
            placeholder="eg. 1"
            value={this.state[`indexFrom`]}
            onChange={evt => {
              this.updateInputValue(evt);
            }}
          />
          <p>to</p>
          <input
            className="minMaxInput"
            input-type="minMaxInput"
            input-key="index"
            type="number"
            name="indexTo"
            placeholder="eg. 5"
            value={this.state[`indexTo`]}
            onChange={evt => {
              this.updateInputValue(evt);
            }}
          />
          <button
            className={setIndex ? 'setButton' : null}
            type="button"
            onClick={() => {
              !setIndex
                ? this.sendMinMaxToParent('index')
                : this.removeMinMaxFromParent('index');
            }}
          >
            {setIndex ? 'Remove' : 'Set Values'}
          </button>
        </InputMinMaxContainer>
      </InputBox>
    );

    //Render Odds
    renderedInputs.push(
      <InputBox key="calcOdds">
        <InputBoxHeader>Odds To Win</InputBoxHeader>

        <InputMinMaxContainer>
          <input
            className="minMaxInput"
            input-type="minMaxInput"
            input-key="calcOdds"
            type="number"
            name="calcOddsFrom"
            placeholder="eg. 1"
            value={this.state[`calcOddsFrom`]}
            onChange={evt => {
              this.updateInputValue(evt);
            }}
          />
          <p>to</p>
          <input
            className="minMaxInput"
            input-type="minMaxInput"
            input-key="calcOdds"
            type="number"
            name="calcOddsTo"
            placeholder="eg. 5"
            value={this.state[`calcOddsTo`]}
            onChange={evt => {
              this.updateInputValue(evt);
            }}
          />
          <button
            className={setOdds ? 'setButton' : null}
            type="button"
            onClick={() => {
              !setOdds
                ? this.sendMinMaxToParent('calcOdds')
                : this.removeMinMaxFromParent('calcOdds');
            }}
          >
            {setOdds ? 'Remove' : 'Set Values'}
          </button>
        </InputMinMaxContainer>
      </InputBox>
    );

    //Render Multichoice Inputs
    searchOptionObject.multiChoice.forEach((prop, i) => {
      const propKey = Object.keys(prop)[0];
      prop[propKey] = prop[propKey].filter(x => x);

      renderedInputs.push(
        <InputBox key={i + i}>
          <InputBoxHeader>{returnStringFromCamelCase(propKey)}</InputBoxHeader>

          {prop[propKey].map((option, i) => {
            return (
              <InputOptionContainer key={i}>
                <input
                  input-type="multiChoiceInput"
                  input-key={propKey}
                  onClick={evt => {
                    addSearchFilter(evt);
                  }}
                  type="checkbox"
                  name={option}
                />
                <p>{option}</p>
              </InputOptionContainer>
            );
          })}
        </InputBox>
      );
    });

    //Render Boolean Inputs
    searchOptionObject.booleanProperties.forEach((prop, i) => {
      const propKey = Object.keys(prop)[0];

      renderedInputs.push(
        <InputBox key={prop + i}>
          <InputBoxHeader>{returnStringFromCamelCase(propKey)}</InputBoxHeader>
          {prop[propKey].map((option, i) => (
            <InputOptionContainer key={option + i}>
              <input
                input-type="booleanInput"
                input-key={propKey}
                onClick={evt => addSearchFilter(evt)}
                type="radio"
                name={propKey}
                input-name={option}
                id={option}
              />
              <p>{option}</p>
            </InputOptionContainer>
          ))}
        </InputBox>
      );
    });

    return renderedInputs;
  };

  componentDidUpdate(prevProps) {
    const { searchOptions } = this.props;

    if (searchOptions) {
      if (prevProps.searchOptions !== searchOptions) {
        this.generateInputObjects();
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.searchOptionObject
          ? this.renderAdvancedSearchInputs()
          : null}
      </div>
    );
  }
}

export default InputRender;
