import React, { Component } from 'react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';

import { Search } from 'semantic-ui-react';

//Styles
import { SemanticContainer } from './styles';

//Images
import { image_paths } from '../../../utils/constants/image_paths';

const { baseImageUrl, imgBasePathConcepts } = image_paths;

const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href =
  'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

class SemanticSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: '',
      redirect: false,
      gameID: null
    };
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.gameName });

  handleAutoSuggestClick = gameID => {
    this.setState({ redirect: true, gameID });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) {
        this.setState({
          isLoading: false,
          results: [],
          value: ''
        });
      }

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => {
        return re.test(result.gameName);
      };

      let matching = _.filter(this.props.data, isMatch);

      let displayObjects = [];

      matching.forEach((result, i) => {
        let searchResult = {
          key: i,
          onClick: () => {
            this.handleAutoSuggestClick(result.gameID);
          },
          description: result.index
            ? `Performance Score: ${result.index}`
            : `Performance score: n/a`,
          image: this.props.concepts
            ? imgBasePathConcepts(result.imgName)
            : baseImageUrl(result.imgName),
          price: `$${Number(result.ticketPrice).toFixed(2)}`,
          title: result.gameName
        };

        displayObjects.push(searchResult);
      });

      const sortIndex = (a, b) => parseInt(b.index) - parseInt(a.index);

      displayObjects.sort(sortIndex);

      console.log();

      this.setState({
        isLoading: false,
        results: displayObjects
      });
    }, 300);
  };

  render() {
    const { isLoading, results, value, redirect, gameID } = this.state;
    const { concepts } = this.props;
    return (
      <SemanticContainer>
        {redirect ? (
          <Redirect
            to={{
              pathname: `/viewgame/?gameid=${gameID}`,
              state: {
                gameId: gameID,
                concept: concepts ? true : false
              }
            }}
          />
        ) : null}
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
          placeholder="Quick search"
          {...this.props}
        />
      </SemanticContainer>
    );
  }
}

export default SemanticSearch;
