import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import movieReducer from "./MovieDetails/MovieDetails.reducer";

export default createStore(
  combineReducers({ movie: movieReducer }),
  {},
  applyMiddleware(logger, thunk)
);
