"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_logger_1 = require("redux-logger");
const reducers_1 = require("../reducers/reducers");
const appState = {
    data: {},
    cityList: [],
    forecast: [],
    screen: "locationVariants",
    theme: "dark",
    tempUnits: 'Celsius',
    input: "",
    city: "",
    main: "",
    windSpeed: 0,
    windDir: 0,
    sunrise: 0,
    sunset: 0,
    temp: 0,
    lat: 0,
    lon: 0
};
const logger = redux_logger_1.createLogger();
const rootReducer = redux_1.combineReducers({
    screen: reducers_1.changeScreenReducer,
    theme: reducers_1.changeThemeReducer
});
const store = redux_1.createStore(rootReducer, undefined, redux_1.applyMiddleware(logger));
exports.default = store;
