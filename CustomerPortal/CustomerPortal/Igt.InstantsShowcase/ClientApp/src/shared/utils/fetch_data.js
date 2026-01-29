//Utils
import { useSelector } from "react-redux";
const IGT_API = "api/";
const token = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : null;

  return user ? user.access_token : "";
};

const _post = async (body) => {
  let postConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token() ? `bearer ${token()}` : null,
    },
    body: JSON.stringify(body),
  };

  return postConfig;
};
const _get = async () => {
  let getConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token() ? `bearer ${token()}` : null,
    },
  };

  return getConfig;
};

const _delete = async (body) => {
  let deleteConfig = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token() ? `bearer ${token()}` : null,
    },
    body: body ? JSON.stringify(body) : null,
  };

  return deleteConfig;
};

const new_error = (error) => {
  console.error(error);

  let new_error = {
    status: error.status,
    error: new Error(error),
  };
  return new_error;
};

const getData = async (url) => {
  try {
    const response = await fetch(url, await _get());
    if (response.status == "401") {
      window.location.href = "/authentication/login";
    }
    return await response.json();
  } catch (error) {
    return new_error(error);
  }
};

const postData = async (url, body) => {
  try {
    const response = await fetch(url, await _post(body));
    if (response.status == "401") {
      window.location.href = "/authentication/login";
    }
    return await response.json();
  } catch (error) {
    return new_error(error);
  }
};

const deleteData = async (url, body) => {
  try {
    const response = await fetch(url, await _delete(body));
    if (response.status == "401") {
      window.location.href = "/authentication/login";
    }
    return await response.json();
  } catch (error) {
    return new_error(error);
  }
};

export const fetch_data = {
  /* metadata */
  getUser: async () => {
    const url = `${IGT_API}metadata/user`;

    try {
      const result = await getData(url);
      return result;
    } catch (error) {
      return new_error(error);
    }
  },
  /* lottery */
  fetchLotteries: async (isInternational) => {
    const url = `${IGT_API}lottery/${isInternational ? 1 : 0}`;
    return await getData(url);
  },
  getTicketPrices: async () => {
    const url = `${IGT_API}lottery/ticket-price`;
    try {
      const data = await getData(url);

      //filter temporarily restricts 15 dollar price points
      const filtered = data.filter((x) => x.value != 15);
      if (filtered.length != data.length) {
        console.warn(
          "api/ticketprice has been filtered to remove the $15 price point"
        );
      }

      return filtered;
    } catch (error) {
      return new_error(error);
    }
  },
  /* analytics */
  fetchActiveGamesSellThru: async (customer) => {
    const url = `${IGT_API}analytics/sales/active/${customer}`;
    return await getData(url);
  },
  fetchClosedGamesSalesSellThru: async (ticketPrice, startDate, endDate) => {
    const url = `${IGT_API}analytics/sales/closed`;
    const body = { ticketPrice, startDate, endDate };
    return await postData(url, body);
  },
  fetchWeeksInMarketPenetration: async (endOfWeek, ticketPrice) => {
    const url = `${IGT_API}analytics/weeksinmarket`;
    const body = { endOfWeek, ticketPrice };
    return await postData(url, body);
  },
  fetchWeeklyGamePenetration: async (endOfWeek, ticketPrice) => {
    const url = `${IGT_API}analytics/weeklysalespenetration`;
    const body = { endOfWeek, ticketPrice };
    return await postData(url, body);
  },
  fetchRateOfSalesPenetration: async (endOfWeek, ticketPrice) => {
    const url = `${IGT_API}analytics/rateofsales`;
    const body = { endOfWeek, ticketPrice };
    return await postData(url, body);
  },
  fetchRateOfSalesTrendPenetration: async (startDate, ticketPrice) => {
    const url = `${IGT_API}analytics/rateofsalestrend`;
    const body = { startDate, ticketPrice };
    return await postData(url, body);
  },
  fetchNaloLotterySales: async (startDate) => {
    const url = `${IGT_API}analytics/nalolotterysales`;
    const body = { startDate };
    return await postData(url, body);
  },
  fetchNaloYtdSales: async (customer) => {
    const url = `${IGT_API}analytics/naloytdsales`;
    const body = { customer };
    return await postData(url, body);
  },
  getSalesWeekEndings: async (customercode) => {
    const url = `${IGT_API}analytics/salesweekendings/${customercode}`;
    return await getData(url);
  },
  ticketBreakdown: async (customer, yearType) => {
    const url = `${IGT_API}analytics/ticketbreakdown`;
    const body = { customer, yearType: yearType === undefined ? 0 : yearType };
    return await postData(url, body);
  },
  fetchWeeklySalesSnapshot: async () => {
    const url = `${IGT_API}analytics/fytdweeklysalessnapshot`;
    const body = { yearType: 1 };
    return await postData(url, body);
  },
  fetchGameSales: async (gameId) => {
    const url = `${IGT_API}analytics/gamesales/${gameId}`;
    return await getData(url);
  },
  customerIndexBasic: async (ticketPrice, startDate, endDate, indexWeek) => {
    indexWeek = Number(indexWeek);
    const url = `${IGT_API}analytics/customindex/basic`;
    const body = { ticketPrice, startDate, endDate, indexWeek };
    return await postData(url, body);
  },
  singlePublishedGame: async (gameID) => {
    const url = `${IGT_API}analytics/gamedetails/${gameID}`;
    return await getData(url);
  },
  fetchGamePrizeStructure: async (gameID) => {
    const url = `${IGT_API}analytics/gameprizestructure/${gameID}`;
    return await getData(url);
  },
  instantWeeklySales: async () => {
    const url = `${IGT_API}analytics/instantweeklysales`;
    const body = { yearType: 1 };
    return await postData(url, body);
  },
  fetchWeeklySalesYear: async () => {
    const url = `${IGT_API}analytics/weeklysalesyear`;
    const body = { yearType: 1 };
    return await postData(url, body);
  },
  fetchWeeklySalesYearPricePoint: async (ticketPrice) => {
    const url = `${IGT_API}analytics/weeklysalesyearticketprice`;
    const body = { yearType: 1, ticketPrice };
    return await postData(url, body);
  },
  fetchPrizeStructureProfile: async (
    ticketPrice,
    startDate,
    endDate,
    customerCodes,
    excludeGameId
  ) => {
    const url = `${IGT_API}analytics/prize-structure-profile`;
    const body = {
      ticketPrice,
      startDate,
      endDate,
      customerCodes,
      excludeGameId,
    };
    return await postData(url, body);
  },
  fetchGameSearch: async (model) => {
    const url = `${IGT_API}games`;

    try {
      const data = (await postData(url, model || {})) || [];
      if (data.status == "401") {
        window.location.href = "/authentication/login";
      }
      const projection = data.map((x) => ({
        ...x,
        index: isNaN(x.index) ? 0 : Number(x.index),
      }));

      return projection;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchFavoriteGames: async () => {
    const url = `${IGT_API}games/favorites`;
    return await getData(url);
  },
  saveFavorite: async (gameId) => {
    const url = `${IGT_API}games/favorites/${gameId}`;
    return await getData(url);
  },
  deleteFavorite: async (favoriteId) => {
    const url = `${IGT_API}games/favorites/${favoriteId}`;
    return await deleteData(url);
  },
  fetchMyGames: async () => {
    const url = `${IGT_API}games/launches`;
    return await postData(url, {});
  },
  fetchSearchMetadata: async (body) => {
    const url = `${IGT_API}games/search-metadata`;
    return await postData(url, body || {});
  },

  //detailedGameSearch: async (search) => {
  //  const { token } = getUserToken();
  //  //body should only be an object
  //  const url = `${IGT_API}/detailedgamesearch`;
  //  const body = {
  //    yearType: 0,
  //    ...search,
  //  };

  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const detailedGameSearch = await data.json();
  //    return detailedGameSearch;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //playStyleIndexed: async () => {
  //  const { token } = getUserToken();
  //  //body should only be an object
  //  const url = `${IGT_API}/PlayStyleIndexed`;
  //  const body = {
  //    yearType: 0,
  //  };
  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const playStyleIndexed = await data.json();
  //    return playStyleIndexed;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //themeIndexed: async () => {
  //  const { token } = getUserToken();
  //  //body should only be an object
  //  const url = `${IGT_API}/ThemeIndexed`;
  //  const body = {};
  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const themeIndexed = await data.json();
  //    return themeIndexed;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //themesPrior: async () => {
  //  const { token } = getUserToken();
  //  //body should only be an object
  //  const url = `${IGT_API}/ThemesPrior12Months`;
  //  const body = {};
  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const themesPrior = await data.json();
  //    return themesPrior;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},

  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const instanWeeklySales = await data.json();
  //    return instanWeeklySales;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},

  //ticketBreakdown: async (customer) => {
  //  const { token, tokenCustomer } = getUserToken();
  //  if (!customer) {
  //    customer = tokenCustomer;
  //  }

  //  //body should only be an object
  //  const url = `${IGT_API}/TicketBreakdown`;
  //  const body = {
  //    customer,
  //    yearType: 1,
  //  };

  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const ticketBreakdown = await data.json();

  //    return ticketBreakdown;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //gamesFeatured: async (pageSize, pageIndex) => {
  //  const { token, customer } = getUserToken();
  //  const url = `${IGT_API}/gamefeatured/?customer=${customer}`;

  //  try {
  //    const data = await fetch(url, post(token, { pageIndex: 1, pageSize: 48 }));
  //    const gamesFeatured = await data.json();
  //    return gamesFeatured;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //gameConcepts: async (pageSize, pageIndex) => {
  //  const { token } = getUserToken();

  //  const url = `${IGT_API}/concept/detailedgamesearch`;

  //  const body = {
  //    pageIndex,
  //    pageSize,
  //  };

  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const gameConcepts = await data.json();
  //    return gameConcepts;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //gameMetadata: async () => {
  //  const { token } = getUserToken();
  //  const url = `${IGT_API}/detailedgamesearch/metadata`;

  //  try {
  //    const data = await fetch(url, post(token, {}));
  //    const gameMetadata = await data.json();
  //    //gameMetadata.

  //    sessionStorage.setItem('game_metadata', JSON.stringify(gameMetadata));
  //    return gameMetadata;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //singleConceptGame: async (gameID) => {
  //  const { token } = getUserToken();
  //  const url = `${IGT_API}/concept/gamedetails/${gameID}`;

  //  try {
  //    const data = await fetch(url, get(token));
  //    const singleConceptGame = await data.json();
  //    return singleConceptGame;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //singlePublishedGame: async (gameID) => {
  //  const { token } = getUserToken();
  //  const url = `${IGT_API}/gamedetails/${gameID}`;

  //  try {
  //    const data = await fetch(url, get(token));
  //    const singleConceptGame = await data.json();
  //    return singleConceptGame;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //fetchGamePrizeStructure: async (gameID) => {
  //    const { token } = getUserToken();
  //    const url = `${IGT_API}/gameprizestructure/${gameID}`;

  //    try {
  //        const data = await fetch(url, get(token));
  //        const ps = await data.json();
  //        return ps;
  //    } catch (error) {
  //        return new_error(error);
  //    }
  //},
  //saveFavoritesToUser: async (gameID) => {
  //  const { token } = getUserToken();
  //  const url = `${IGT_API}/favorite/${gameID}`;

  //  try {
  //    const data = await fetch(url, post(token, {}));
  //    const savedToUserFavorites = await data.json();

  //    return savedToUserFavorites;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //deleteFavoriteFromUser: async (favoriteId) => {
  //  const { token } = getUserToken();
  //  const url = `${IGT_API}/favorite/${favoriteId}`;

  //  try {
  //    const data = await fetch(url, _delete(token));
  //    const deletedUserFavorite = await data.json();
  //    return deletedUserFavorite;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //fetchUserFavorites: async () => {
  //  const { token } = getUserToken();
  //  const url = `${IGT_API}/favorite`;

  //  try {
  //    const data = await fetch(url, get(token));
  //    const userFavorites = await data.json();
  //    return userFavorites;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //fetchGameSales: async (gameId) => {
  //  const { token } = getUserToken();
  //  const url = `${IGT_API}/gamesales/${gameId}`;

  //  try {
  //    const data = await fetch(url, get(token));
  //    const gameSales = await data.json();
  //    return gameSales;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},

  //fetchActiveGamesSellThru: async () => {
  //  const { token, customer } = getUserToken();
  //  //body should only be an object
  //  const url = `${IGT_API}/report/activesales`;
  //  const body = { customer };

  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const activeGamesSellThrus = await data.json();
  //    return activeGamesSellThrus;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //fetchClosedGamesSalesSellThru: async (ticketPrice, startDate, endDate) => {
  //  const { token, customer } = getUserToken();
  //  //body should only be an object
  //  const url = `${IGT_API}/report/closedsales`;
  //  const body = { customer, ticketPrice, startDate, endDate };

  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const closedGamesSalesSellThru = await data.json();
  //    return closedGamesSalesSellThru;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //fetchDynamicPricePoint: async (ticketPrice, startDate, endDate) => {
  //  const { token, customer } = getUserToken();
  //  //body should only be an object
  //  const url = `${IGT_API}/report/pricepointdynamic`;
  //  const body = { customer, ticketPrice, startDate, endDate };

  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const dynamicPricePoint = await data.json();
  //    return dynamicPricePoint;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //fetchNaloLotterySales: async (startDate) => {
  //  const { token } = getUserToken();
  //  //body should only be an object
  //  const url = `${IGT_API}/NaloLotterySales`;
  //  const body = { startDate };

  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const naloLotterySales = await data.json();
  //    return naloLotterySales;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //fetchNaloYtdSales: async (customer) => {
  //  const { token } = getUserToken();
  //  const url = `${IGT_API}/naloytdsales`;
  //  const body = { customer };

  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const naloYtdSales = await data.json();
  //    return naloYtdSales;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //fetchNaloAverageSales: async (customers) => {
  //  const { token } = getUserToken();
  //  const url = `${IGT_API}/naloaveragesales`;
  //  const body = { customers };

  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const naloYtdSales = await data.json();
  //    return naloYtdSales;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //fetchLotteries: async (isInternational) => {
  //  const { token } = getUserToken();
  //  const url = `${IGT_API}/lottery/${isInternational ? 1 : 0}`;

  //  try {
  //    const data = await fetch(url, get(token));
  //    const lotteries = await data.json();
  //    return lotteries;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
  //getTicketPrices: async (customercode) => {
  //  const { token, customer } = getUserToken();
  //  const url = `${IGT_API}/ticketprice/${customercode || customer}`;

  //  try {
  //    const data = await fetch(url, get(token));
  //    const ticketPrices = await data.json();

  //    //filter temporarily restricts 15 dollar price points
  //    const filtered = ticketPrices.filter((x) => x.value != 15);
  //    if (filtered.length != ticketPrices.length) {
  //      console.warn('api/ticketprice has been filtered to remove the $15 price point');
  //    }

  //    return filtered;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},

  //fetchWeeklyGamePenetration: async (endOfWeek, ticketPrice) => {
  //  const { token, customer } = getUserToken();
  //  //body should only be an object
  //  const url = `${IGT_API}/weeklysalespenetration`;
  //  const body = { endOfWeek, ticketPrice, customer };

  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const penData = await data.json();
  //    return penData;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},

  //fetchPrizeStructureProfile: async (ticketPrice, startDate, endDate, customerCodes, excludeGameId) => {
  //  const { token, customer } = getUserToken();
  //  //body should only be an object
  //  const url = `${IGT_API}/prize-structure-profile`;
  //  const body = {
  //    customerCode: customer,
  //    ticketPrice,
  //    startDate,
  //    endDate,
  //    customerCodes,
  //    excludeGameId,
  //  };

  //  try {
  //    const data = await fetch(url, post(token, body));
  //    const penData = await data.json();
  //    return penData;
  //  } catch (error) {
  //    return new_error(error);
  //  }
  //},
};
