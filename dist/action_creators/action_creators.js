"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWeather = exports.setCityList = exports.setCoords = exports.setForecast = exports.handleTextInput = exports.changeTempUnits = exports.changeThemeDark = exports.changeThemeLight = exports.changeScreen = void 0;
function changeScreen(screen) {
    return { type: "toggleScreen", screen };
}
exports.changeScreen = changeScreen;
function changeThemeDark() {
    return { type: "changeThemeDark" };
}
exports.changeThemeDark = changeThemeDark;
function changeThemeLight() {
    return { type: "changeThemeLight" };
}
exports.changeThemeLight = changeThemeLight;
function changeTempUnits(units) {
    return { type: "changeTempUnits", units };
}
exports.changeTempUnits = changeTempUnits;
function handleTextInput(input) {
    return { type: "handleTextInput", input };
}
exports.handleTextInput = handleTextInput;
function setForecast(forecast) {
    return { type: "setForecast", forecast };
}
exports.setForecast = setForecast;
function setCoords(lat, lon) {
    return { type: "setCoords", lat, lon };
}
exports.setCoords = setCoords;
function setCityList(list) {
    return { type: "setCityList", list };
}
exports.setCityList = setCityList;
function setWeather(weather) {
    return { type: "setWeather", weather };
}
exports.setWeather = setWeather;
