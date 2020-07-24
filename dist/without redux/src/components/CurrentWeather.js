"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const WIND_DIRS = [[-1, 11.25, "North"], [11.25, 33, "North North-East"], [33, 56, "North-East"], [56, 78, "East North-East"], [78, 101, "East"],
    [101, 123, "East South-East"], [123, 146, "South-East"], [146, 168, "South South-East"], [168, 191, "South"], [191, 213, "South South-West"],
    [213, 236, "South-West"], [236, 258, "West South-West"], [258, 281, "West"], [281, 301, "West North-West"], [303, 326, "North-West"], [326, 348, "North North-West"], [348, 360, "North"]];
const CurrentWeather = ({ main, name, windDir, sunrise, sunset, windSpeed, temp, tempUnits }) => react_1.default.createElement("div", { className: "daily" },
    react_1.default.createElement("p", { style: { fontSize: 26, marginBottom: -10, fontWeight: "bold" } }, name),
    react_1.default.createElement("div", { className: "main-info" },
        react_1.default.createElement("p", null,
            main === "Snow" && react_1.default.createElement("i", { className: 'wi wi-snow fa-buttons' }),
            main === "Rain" && react_1.default.createElement("i", { className: 'wi wi-rain fa-buttons' }),
            main === "Clear" && react_1.default.createElement("i", { className: 'wi wi-day-sunny fa-buttons' }),
            main === "Clouds" && react_1.default.createElement("i", { className: 'wi wi-cloudy fa-buttons' })),
        react_1.default.createElement("p", { className: "temperature" }, tempUnits === "Celsius" ? (temp - 273.15).toFixed(1) + " °C" : ((temp - 273.15) * 9 / 5 + 32).toFixed(1) + " °F")),
    react_1.default.createElement("div", { id: "wind-info" },
        react_1.default.createElement("p", null, windSpeed + " m/s"),
        react_1.default.createElement("p", null, WIND_DIRS.filter(windDirData => windDir > windDirData[0] && windDir <= windDirData[1])[0][2])),
    react_1.default.createElement("div", { id: "sun-info" },
        react_1.default.createElement("p", { className: "pie" },
            react_1.default.createElement("i", { className: 'wi wi-sunrise fa-buttons' }),
            "\u00A0\u00A0\u00A0\u00A0",
            new Date(sunrise).toString().split(" ").slice(4, 5).join(" ")),
        react_1.default.createElement("p", { className: "pie" },
            react_1.default.createElement("i", { className: 'wi wi-sunset fa-buttons' }),
            "\u00A0\u00A0\u00A0\u00A0",
            new Date(sunset).toString().split(" ").slice(4, 5).join(" "))));
exports.default = CurrentWeather;
