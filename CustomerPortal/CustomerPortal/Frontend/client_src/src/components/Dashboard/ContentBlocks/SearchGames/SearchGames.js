import React from 'react';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

//Styles
import { SearchGamesContainer, Heading, SearchInput } from './styles';

const SearchGames = () => {
  return (
    <SearchGamesContainer>
      <Heading>
        <h4>Search Games</h4>
      </Heading>
      <SearchInput>
        <input
          name="search"
          type="text"
          placeholder="Enter a keyword"
          required
        />
        <button>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </SearchInput>
    </SearchGamesContainer>
  );
};

export default SearchGames;
