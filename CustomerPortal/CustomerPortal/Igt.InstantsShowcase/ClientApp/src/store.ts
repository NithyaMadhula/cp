import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createSlice } from "@reduxjs/toolkit";

//user slice
if (localStorage.getItem("user") == "undefined") {
  localStorage.removeItem("user");
}

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") || "")
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

const { loginSuccess, logoutSuccess } = userSlice.actions;
export const login = (user: any) => async (dispatch: any) => {
  try {
    dispatch(loginSuccess(user));
  } catch (e) {
    return console.error(e.message);
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    dispatch(logoutSuccess({}));
  } catch (e) {
    return console.error(e.message);
  }
};

/** favorites slice */

const initialFav: any[] = [];

const favSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: initialFav,
  },
  reducers: {
    save: (state, action) => {
      debugger;
      state.favorites = action.payload;
    },
    remove: (state, action) => {
      state.favorites = state.favorites.filter(
        (x) => x.favoriteID != action.payload
      );
    },
  },
});

const { save, remove } = favSlice.actions;
export const saveFavorite = (fav: any) => async (dispatch: any) => {
  try {
    debugger;
    dispatch(save(fav));
  } catch (e) {
    return console.error(e.message);
  }
};

export const removeFavorite = (favoriteID: number) => async (dispatch: any) => {
  try {
    dispatch(remove(favoriteID));
  } catch (e) {
    return console.error(e.message);
  }
};

/** store */

const reducer = combineReducers({
  user: userSlice.reducer,
  favorites: favSlice.reducer,
});

const store = configureStore({
  reducer,
});

export default store;
