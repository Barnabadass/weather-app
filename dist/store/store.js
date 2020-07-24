"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_logger_1 = require("redux-logger");
const reducers_1 = require("../reducers/reducers");
const logger = redux_logger_1.createLogger();
const rootReducer = redux_1.combineReducers({
    screen: reducers_1.screen,
    theme: reducers_1.theme,
    tempUnits: reducers_1.tempUnits,
    input: reducers_1.input,
    forecast: reducers_1.forecast,
    coords: reducers_1.coords,
    cityList: reducers_1.cityList,
    weather: reducers_1.weather
});
const store = redux_1.createStore(rootReducer, undefined, redux_1.applyMiddleware(logger));
exports.default = store;
