import React, { useEffect } from "react";

//Styles
import { InputWrap, SeeMoreOptionsContainer, OptionsContainer } from "./styles";

const FilterOptionInputs = ({
  setFilter,
  filterArray,
  filterChosen,
  filterValuesSelected,
}) => {
  //This useEffect block handles updating the 'see more' filter options to be in sync with the default viewed list of filter option inputs. When you select a default view filter option and then open up 'see more filters', this will make sure the selected filter before opening up the 'see more filters' matches what has been clicked previously. This also handles deselecting filter options between the two components as well.
  useEffect(() => {
    if (filterValuesSelected.length === 0) {
      const element = [...document.getElementsByClassName("filterRadioButton")];

      element.forEach((elem) => {
        elem.checked = false;
      });
    }
    filterValuesSelected.forEach((value) => {
      const element = [...document.getElementsByClassName(`filterRadioButton`)];

      element.forEach((elem) => {
        if (elem.value === value) {
          elem.checked = true;
        }
      });
    });
  }, [filterValuesSelected]);

  const renderInputs = () => {
    let renderedInputs = [];
    let fullRenderedInputs = [];
    let seeMoreRenderedInputs = [];

    let filters = filterArray || [];
    filters = filters.filter((x) => !!x);

    if (filterChosen === "ticketPrice") {
      const byHighestToLowest = (a, b) => parseInt(a) - parseInt(b);

      let sortedValueTicketPrice = filters.sort(byHighestToLowest);

      filters = sortedValueTicketPrice;
    }

    const parsedIntegerFromString = (num) => `$${parseInt(num).toFixed(0)}`;

    filters.forEach((filter, i) => {
      if (i < 5) {
        renderedInputs.push(
          <InputWrap key={i + i - 1}>
            <input
              className="filterRadioButton"
              type="checkbox"
              name={filter}
              value={filter}
              filter={
                filterChosen === "customer" ? "subDivisionCode" : filterChosen
              }
              onClick={(evt) => {
                setFilter(evt);
              }}
            />
            <span>
              {filterChosen === "ticketPrice"
                ? parsedIntegerFromString(filter)
                : filter}
            </span>
          </InputWrap>
        );
      }
    });

    const toggleBoxOpen = (filterId) => {
      const doc = document.getElementById(filterId);

      if (doc.classList.contains("filterSeeMoreShow")) {
        doc.classList.remove("filterSeeMoreShow");
      } else {
        doc.classList.add("filterSeeMoreShow");
      }
    };

    filters.forEach((filter, i) => {
      fullRenderedInputs.push(
        <InputWrap key={i + i - 1}>
          <input
            className="filterRadioButton"
            type="checkbox"
            name={filter}
            value={filter}
            filter={
              filterChosen === "customer" ? "subDivisionCode" : filterChosen
            }
            onClick={(evt) => {
              setFilter(evt);
            }}
          />
          <span>
            {filterChosen === "ticketPrice"
              ? parsedIntegerFromString(filter)
              : filter}
          </span>
        </InputWrap>
      );
    });

    const camelCaseToString = filterChosen.replace(/([A-Z])/g, " $1");
    const formatedFilterName =
      camelCaseToString.charAt(0).toUpperCase() + camelCaseToString.slice(1);

    seeMoreRenderedInputs.push(
      <InputWrap key={filterChosen + 1}>
        <p
          className="seeMoreLink"
          onClick={() => {
            toggleBoxOpen(filterChosen + 1);
          }}
          id={
            formatedFilterName === "Licensed Property"
              ? "licensedProperty"
              : null
          }
        >
          See More Options
        </p>
        <div className="filterSeeMoreContainer" id={filterChosen + 1}>
          <SeeMoreOptionsContainer>
            <h4>{formatedFilterName.replace(/Primary[ ]+/g, "")}</h4>
            <OptionsContainer>{fullRenderedInputs}</OptionsContainer>
            <button
              type="button"
              onClick={() => toggleBoxOpen(filterChosen + 1)}
            >
              Close
            </button>
          </SeeMoreOptionsContainer>
        </div>
      </InputWrap>
    );

    let combinedInputs = [...renderedInputs, ...seeMoreRenderedInputs];

    return combinedInputs;
  };

  return <div>{renderInputs()}</div>;
};

export default FilterOptionInputs;
