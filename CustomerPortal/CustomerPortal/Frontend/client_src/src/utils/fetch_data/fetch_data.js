//Utils
import { userAuth } from '../../authentication/authentication';

//Fetch Config...
import { fetch_config } from '../fetch_config/config';

//API
import { api_endpoints } from '../../utils/constants/api_endpoints';
const { IGT_API } = api_endpoints;

//Auth
const { getUserToken } = userAuth;

//...Fetch Config (post takes a token and body object as arguments, get takes a token as it's only argument)
const { post, get, _delete } = fetch_config;

const new_error = (error) => {
  let new_error = {
    status: 404,
    error: new Error(error),
  };
  return new_error;
};

export const fetch_data = {
  detailedGameSearch: async (search) => {
    const { token } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/detailedgamesearch`;
    const body = {
      yearType: 0,
      ...search,
    };

    try {
      const data = await fetch(url, post(token, body));
      const detailedGameSearch = await data.json();
      return detailedGameSearch;
    } catch (error) {
      return new_error(error);
    }
  },
  playStyleIndexed: async () => {
    const { token } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/PlayStyleIndexed`;
    const body = {
      yearType: 0,
    };
    try {
      const data = await fetch(url, post(token, body));
      const playStyleIndexed = await data.json();
      return playStyleIndexed;
    } catch (error) {
      return new_error(error);
    }
  },
  themeIndexed: async () => {
    const { token } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/ThemeIndexed`;
    const body = {};
    try {
      const data = await fetch(url, post(token, body));
      const themeIndexed = await data.json();
      return themeIndexed;
    } catch (error) {
      return new_error(error);
    }
  },
  themesPrior: async () => {
    const { token } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/ThemesPrior12Months`;
    const body = {};
    try {
      const data = await fetch(url, post(token, body));
      const themesPrior = await data.json();
      return themesPrior;
    } catch (error) {
      return new_error(error);
    }
  },
  instantWeeklySales: async () => {
    const { token, customer } = getUserToken();
    //body should only be an object

    const url = `${IGT_API}/instantWeeklySales`;
    const body = {
      customer,
      yearType: 1,
    };

    try {
      const data = await fetch(url, post(token, body));
      const instanWeeklySales = await data.json();
      return instanWeeklySales;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchWeeklySalesSnapshot: async () => {
    const { token, customer } = getUserToken();
    //body should only be an object

    const url = `${IGT_API}/FYTDWeeklySalesSnapshot`;
    const body = {
      customer,
      yearType: 1,
    };

    try {
      const data = await fetch(url, post(token, body));
      const instanWeeklySales = await data.json();
      return instanWeeklySales;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchWeeklySalesYear: async () => {
    const { token, customer } = getUserToken();
    //body should only be an object

    const url = `${IGT_API}/weeklysalesyear`;
    const body = {
      customer,
      yearType: 1,
    };

    try {
      const data = await fetch(url, post(token, body));
      const instanWeeklySales = await data.json();
      return instanWeeklySales;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchWeeklySalesYearPricePoint: async (ticketPrice) => {
    const { token, customer } = getUserToken();
    //body should only be an object

    const url = `${IGT_API}/weeklysalesyearticketprice`;
    const body = {
      customer,
      yearType: 1,
      ticketPrice,
    };

    try {
      const data = await fetch(url, post(token, body));
      const instanWeeklySales = await data.json();
      return instanWeeklySales;
    } catch (error) {
      return new_error(error);
    }
  },
  ticketBreakdown: async (customer) => {
    const { token, tokenCustomer } = getUserToken();
    if (!customer) {
      customer = tokenCustomer;
    }

    //body should only be an object
    const url = `${IGT_API}/TicketBreakdown`;
    const body = {
      customer,
      yearType: 1,
    };

    try {
      const data = await fetch(url, post(token, body));
      const ticketBreakdown = await data.json();

      return ticketBreakdown;
    } catch (error) {
      return new_error(error);
    }
  },
  gamesFeatured: async (pageSize, pageIndex) => {
    const { token, customer } = getUserToken();
    const url = `${IGT_API}/gamefeatured/?customer=${customer}`;

    try {
      const data = await fetch(url, post(token, { pageIndex: 1, pageSize: 48 }));
      const gamesFeatured = await data.json();
      return gamesFeatured;
    } catch (error) {
      return new_error(error);
    }
  },
  gameConcepts: async (pageSize, pageIndex) => {
    const { token } = getUserToken();

    const url = `${IGT_API}/concept/detailedgamesearch`;

    const body = {
      pageIndex,
      pageSize,
    };

    try {
      const data = await fetch(url, post(token, body));
      const gameConcepts = await data.json();
      return gameConcepts;
    } catch (error) {
      return new_error(error);
    }
  },
  gameMetadata: async () => {
    const { token } = getUserToken();
    const url = `${IGT_API}/detailedgamesearch/metadata`;

    try {
      const data = await fetch(url, post(token, {}));
      const gameMetadata = await data.json();
      //gameMetadata.

      sessionStorage.setItem('game_metadata', JSON.stringify(gameMetadata));
      return gameMetadata;
    } catch (error) {
      return new_error(error);
    }
  },
  singleConceptGame: async (gameID) => {
    const { token } = getUserToken();
    const url = `${IGT_API}/concept/gamedetails/${gameID}`;

    try {
      const data = await fetch(url, get(token));
      const singleConceptGame = await data.json();
      return singleConceptGame;
    } catch (error) {
      return new_error(error);
    }
  },
  singlePublishedGame: async (gameID) => {
    const { token } = getUserToken();
    const url = `${IGT_API}/gamedetails/${gameID}`;

    try {
      const data = await fetch(url, get(token));
      const singleConceptGame = await data.json();
      return singleConceptGame;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchGamePrizeStructure: async (gameID) => {
    const { token } = getUserToken();
    const url = `${IGT_API}/gameprizestructure/${gameID}`;

    try {
      const data = await fetch(url, get(token));
      const ps = await data.json();
      return ps;
    } catch (error) {
      return new_error(error);
    }
  },
  saveFavoritesToUser: async (gameID) => {
    const { token } = getUserToken();
    const url = `${IGT_API}/favorite/${gameID}`;

    try {
      const data = await fetch(url, post(token, {}));
      const savedToUserFavorites = await data.json();

      return savedToUserFavorites;
    } catch (error) {
      return new_error(error);
    }
  },
  deleteFavoriteFromUser: async (favoriteId) => {
    const { token } = getUserToken();
    const url = `${IGT_API}/favorite/${favoriteId}`;

    try {
      const data = await fetch(url, _delete(token));
      const deletedUserFavorite = await data.json();
      return deletedUserFavorite;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchUserFavorites: async () => {
    const { token } = getUserToken();
    const url = `${IGT_API}/favorite`;

    try {
      const data = await fetch(url, get(token));
      const userFavorites = await data.json();
      return userFavorites;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchGameSales: async (gameId) => {
    const { token } = getUserToken();
    const url = `${IGT_API}/gamesales/${gameId}`;

    try {
      const data = await fetch(url, get(token));
      const gameSales = await data.json();
      return gameSales;
    } catch (error) {
      return new_error(error);
    }
  },
  customerIndexBasic: async (ticketPrice, startDate, endDate, indexWeek) => {
    const { token, customer } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/customindex/basic`;
    const body = { customer, ticketPrice, startDate, endDate, indexWeek };

    try {
      const data = await fetch(url, post(token, body));
      const customerIndexBasic = await data.json();
      return customerIndexBasic;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchActiveGamesSellThru: async () => {
    const { token, customer } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/report/activesales`;
    const body = { customer };

    try {
      const data = await fetch(url, post(token, body));
      const activeGamesSellThrus = await data.json();
      return activeGamesSellThrus;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchClosedGamesSalesSellThru: async (ticketPrice, startDate, endDate) => {
    const { token, customer } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/report/closedsales`;
    const body = { customer, ticketPrice, startDate, endDate };

    try {
      const data = await fetch(url, post(token, body));
      const closedGamesSalesSellThru = await data.json();
      return closedGamesSalesSellThru;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchDynamicPricePoint: async (ticketPrice, startDate, endDate) => {
    const { token, customer } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/report/pricepointdynamic`;
    const body = { customer, ticketPrice, startDate, endDate };

    try {
      const data = await fetch(url, post(token, body));
      const dynamicPricePoint = await data.json();
      return dynamicPricePoint;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchNaloLotterySales: async (startDate) => {
    const { token } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/NaloLotterySales`;
    const body = { startDate };

    try {
      const data = await fetch(url, post(token, body));
      const naloLotterySales = await data.json();
      return naloLotterySales;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchNaloYtdSales: async (customer) => {
    const { token } = getUserToken();
    const url = `${IGT_API}/naloytdsales`;
    const body = { customer };

    try {
      const data = await fetch(url, post(token, body));
      const naloYtdSales = await data.json();
      return naloYtdSales;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchNaloAverageSales: async (customers) => {
    const { token } = getUserToken();
    const url = `${IGT_API}/naloaveragesales`;
    const body = { customers };

    try {
      const data = await fetch(url, post(token, body));
      const naloYtdSales = await data.json();
      return naloYtdSales;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchLotteries: async (isInternational) => {
    const { token } = getUserToken();
    const url = `${IGT_API}/lottery/${isInternational ? 1 : 0}`;

    try {
      const data = await fetch(url, get(token));
      const lotteries = await data.json();
      return lotteries;
    } catch (error) {
      return new_error(error);
    }
  },
  getTicketPrices: async (customercode) => {
    const { token, customer } = getUserToken();
    const url = `${IGT_API}/ticketprice/${customercode || customer}`;

    try {
      const data = await fetch(url, get(token));
      const ticketPrices = await data.json();

      //filter temporarily restricts 15 dollar price points
      const filtered = ticketPrices.filter((x) => x.value != 15);
      if (filtered.length != ticketPrices.length) {
        console.warn('api/ticketprice has been filtered to remove the $15 price point');
      }

      return filtered;
    } catch (error) {
      return new_error(error);
    }
  },
  getSalesWeekEndings: async (customercode) => {
    const { token, customer } = getUserToken();
    const url = `${IGT_API}/salesweekendings/${customercode || customer}`;

    try {
      const data = await fetch(url, get(token));
      const weekEndings = await data.json();
      return weekEndings;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchWeeklyGamePenetration: async (endOfWeek, ticketPrice) => {
    const { token, customer } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/weeklysalespenetration`;
    const body = { endOfWeek, ticketPrice, customer };

    try {
      const data = await fetch(url, post(token, body));
      const penData = await data.json();
      return penData;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchWeeksInMarketPenetration: async (endOfWeek, ticketPrice) => {
    const { token, customer } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/weeksinmarket`;
    const body = { endOfWeek, ticketPrice, customer };

    try {
      const data = await fetch(url, post(token, body));
      const penData = await data.json();
      return penData;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchRateOfSalesPenetration: async (endOfWeek, ticketPrice) => {
    const { token, customer } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/rateofsales`;
    const body = { endOfWeek, ticketPrice, customer };

    try {
      const data = await fetch(url, post(token, body));
      const penData = await data.json();
      return penData;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchRateOfSalesTrendPenetration: async (startDate, ticketPrice) => {
    const { token, customer } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/rateofsalestrend`;
    const body = { startDate, ticketPrice, customer };

    try {
      const data = await fetch(url, post(token, body));
      const penData = await data.json();
      return penData;
    } catch (error) {
      return new_error(error);
    }
  },
  fetchPrizeStructureProfile: async (ticketPrice, startDate, endDate, customerCodes, excludeGameId) => {
    const { token, customer } = getUserToken();
    //body should only be an object
    const url = `${IGT_API}/prize-structure-profile`;
    const body = {
      customerCode: customer,
      ticketPrice,
      startDate,
      endDate,
      customerCodes,
      excludeGameId,
    };

    try {
      const data = await fetch(url, post(token, body));
      const penData = await data.json();
      return penData;
    } catch (error) {
      return new_error(error);
    }
  },
};
