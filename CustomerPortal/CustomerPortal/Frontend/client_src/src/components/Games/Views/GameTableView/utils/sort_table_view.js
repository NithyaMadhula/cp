export const handleTableSort = {
  //Need currentSortValue, event, gameData
  sortByValueFormat: function (sortByValue) {
    return sortByValue.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  },
  //   sortByLowestToHighestInteger: (a, b, sortBy) => parseInt(a[sortBy]) - parseInt(b[sortBy]),
  sortToHighestInteger: function (gameData, sortByValue) {
    let sortBy = this.sortByValueFormat(sortByValue);

    const sortByHighestToLowestInteger = (a, b) => {
      return parseInt(b[sortBy]) - parseInt(a[sortBy]);
    };

    //This block is responsible for separating the empty values from valid values. For example, not every game has an index score. We can't sort null!
    let gamesWithTargetValue = [];
    let gamesWithNoTargetValue = [];

    gameData.forEach((game) => {
      if (game[sortBy]) {
        gamesWithTargetValue.push(game);
      } else {
        gamesWithNoTargetValue.push(game);
      }
    });

    //Sort the games with a valid target value
    gamesWithTargetValue.sort(sortByHighestToLowestInteger);

    //Combine both arrays, the sorted array is spread first.
    let filteredData = [...gamesWithTargetValue, ...gamesWithNoTargetValue];

    return filteredData;
  },
  sortToLowestInteger: function (gameData, sortByValue) {
    let sortBy = this.sortByValueFormat(sortByValue);

    const sortByHighestToLowestInteger = (a, b) => parseInt(a[sortBy]) - parseInt(b[sortBy]);
    //This block is responsible for separating the empty values from valid values. For example, not every game has an index score. We can't sort null!
    let gamesWithTargetValue = [];
    let gamesWithNoTargetValue = [];

    gameData.forEach((game) => {
      if (game[sortBy]) {
        gamesWithTargetValue.push(game);
      } else {
        gamesWithNoTargetValue.push(game);
      }
    });

    //Sort the games with a valid target value
    gamesWithTargetValue.sort(sortByHighestToLowestInteger);

    //Combine both arrays, the sorted array is spread first.
    let filteredData = [...gamesWithTargetValue, ...gamesWithNoTargetValue];

    return filteredData;
  },
  sortByMostRecentDate: (gameData) => {
    const sortRecentDate = (a, b) => {
      const newDate = (date) => new Date(date).getTime();

      return newDate(b.startDate) - newDate(a.startDate);
    };
    let filteredData = [...gameData.sort(sortRecentDate)];

    return filteredData;
  },
  sortByFurthestDate: (gameData) => {
    const sortRecentDate = (a, b) => {
      const newDate = (date) => new Date(date).getTime();

      return newDate(a.startDate) - newDate(b.startDate);
    };
    let filteredData = [...gameData.sort(sortRecentDate)];

    return filteredData;
  },
  sortByString: function (gameData, toggleSort, sortByValue) {
    let sortBy = this.sortByValueFormat(sortByValue);

    if (sortBy === 'colorName') {
      sortBy = 'color';
    }
    if (sortBy === 'themeName') {
      sortBy = 'theme';
    }
    if (sortBy === 'state') {
      sortBy = 'businessName';
    }
    if (sortBy === 'jurisdiction') {
      sortBy = 'subDivisionCode';
    }

    const sortGamesAlphabeticallyByChosenValue = (a, b) => {
      if (!a[sortBy] || !b[sortBy]) {
        return;
      } else {
        let valueA = a[sortBy].toUpperCase();
        let valueB = b[sortBy].toUpperCase();

        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      }
    };

    let sortedData = [...gameData.sort(sortGamesAlphabeticallyByChosenValue)];

    return sortedData;
  },
};
