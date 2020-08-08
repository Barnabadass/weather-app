"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const Forecast = ({ forecast, tempUnits, city }) => react_1.default.createElement("div", { id: "forecast-wrapper" },
    react_1.default.createElement("h2", { id: 'forc' },
        "5 day forecast for ",
        city),
    react_1.default.createElement("div", { id: 'forecast-div' }, forecast.map((item) => react_1.default.createElement("div", { className: 'forec' },
        react_1.default.createElement("p", null, item['dt_txt'].replace(/(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})/, (nil, one, two, three, four, five, six) => {
            two = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][parseInt(two) - 1];
            return three + " " + two + " " + one + " " + four + ":" + five;
        })),
        react_1.default.createElement("p", null, tempUnits === "Celsius" ? Number(item.main.temp - 273.15).toFixed(1) + " °C" : (Number(item.main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + " °F"),
        react_1.default.createElement("div", { className: 'main-weather-forec' },
            react_1.default.createElement("p", null,
                item.weather[0].main === "Snow" && react_1.default.createElement("i", { className: 'wi wi-snow fa-buttons' }),
                item.weather[0].main === "Rain" && react_1.default.createElement("i", { className: 'wi wi-rain fa-buttons' }),
                item.weather[0].main === "Clear" && react_1.default.createElement("i", { className: 'wi wi-day-sunny fa-buttons' }),
                item.weather[0].main === "Clouds" && react_1.default.createElement("i", { className: 'wi wi-cloudy fa-buttons' })),
            react_1.default.createElement("p", null, item.weather[0].main))))));
function mapStateToProps({ tempUnits, forecast, weather }, props) {
    return { tempUnits, forecast, city: weather.city };
}
const ConnectedForecast = react_redux_1.connect(mapStateToProps)(Forecast);
exports.default = ConnectedForecast;
