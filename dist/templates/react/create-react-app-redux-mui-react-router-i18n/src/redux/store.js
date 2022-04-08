import { configureStore, combineReducers } from "@reduxjs/toolkit";

import common from "./common";

const reducers = combineReducers({
  common: common,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
