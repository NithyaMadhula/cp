import React from 'react';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

//Styles
import {
  CrumbTrailContainer,
  CrumbTrailBox,
  FilterTag,
  FilterTagMask,
  FilterTagRemove
} from './styles';

const FilterCrumbTrail = ({ filters, updateFilters }) => {
  const removeFilter = evt => {
    const { target } = evt;
    const { innerHTML } = target;
    let index = innerHTML;
    let filterValue = filters[index];

    //Takes the passed in filters array from props and removes the clicked 'quick remove' filter from the filters array and then sends it back to FilterGames.js for handling
    filters.splice(index, 1);

    updateFilters(filters, filterValue);
  };

  return (
    <CrumbTrailContainer>
      <CrumbTrailBox>
        <FilterTagRemove>
          <FontAwesomeIcon icon={faInfoCircle} />
          <p>Click to quick remove filters</p>
        </FilterTagRemove>

        {filters.map((filter, i) => (
          <FilterTag key={i}>
            <FilterTagMask
              onClick={e => {
                removeFilter(e);
              }}
            >
              {i}
            </FilterTagMask>
            <p>{isNaN(filter) ? filter : `$${parseInt(filter).toFixed(0)}`}</p>
          </FilterTag>
        ))}
      </CrumbTrailBox>
    </CrumbTrailContainer>
  );
};

export default FilterCrumbTrail;
