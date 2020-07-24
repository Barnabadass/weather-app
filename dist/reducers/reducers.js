"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weather = exports.cityList = exports.coords = exports.forecast = exports.input = exports.tempUnits = exports.theme = exports.screen = void 0;
function screen(screen = "introduction", action) {
    return action.screen || screen;
}
exports.screen = screen;
function theme(theme = "dark", action) {
    switch (action.type) {
        case "changeThemeLight":
            return "light";
        case "changeThemeDark":
            return "dark";
        default:
            return theme;
    }
}
exports.theme = theme;
function tempUnits(units = "Celsius", action) {
    return action.units || units;
}
exports.tempUnits = tempUnits;
function input(input = "", action) {
    return action.input || input;
}
exports.input = input;
function forecast(forecast = [], action) {
    return action.forecast || forecast;
}
exports.forecast = forecast;
function coords(coord = { lat: 0, lon: 0 }, action) {
    return action.lat === undefined ? coord : { lat: action.lat, lon: action.lon };
}
exports.coords = coords;
function cityList(list = [], action) {
    return action.list || list;
}
exports.cityList = cityList;
const defaultWeather = {
    city: "",
    main: "",
    temp: 0,
    windSpeed: 0,
    windDir: 0,
    sunrise: 0,
    sunset: 0
};
function weather(weather = defaultWeather, action) {
    return action.weather || weather;
}
exports.weather = weather;
