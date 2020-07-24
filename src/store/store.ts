import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import { screen, theme, tempUnits, input, forecast, coords, cityList, weather } from "../reducers/reducers";

const logger = createLogger();
const rootReducer = combineReducers({ 
  screen, 
  theme, 
  tempUnits, 
  input,
  forecast,
  coords,
  cityList,
  weather
});
const store = createStore(rootReducer, undefined, applyMiddleware(logger));

export default store;