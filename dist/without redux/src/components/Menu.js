"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Menu = ({ theme, color, darkThemeOn, showCelsius, toggleMenu, changeTheme, changeTempUnits }) => react_1.default.createElement("div", { id: "menu", style: { background: theme, color: color } },
    react_1.default.createElement("button", { className: "top-buttons", onClick: toggleMenu, id: "bars-button" },
        react_1.default.createElement("i", { className: "fa fa-bars fa-buttons", style: { color: color } })),
    react_1.default.createElement("h2", { id: "theme" }, "Theme:"),
    react_1.default.createElement("label", null,
        react_1.default.createElement("input", { type: "radio", id: "light", checked: !darkThemeOn, onClick: () => changeTheme("light") }),
        "Light"),
    react_1.default.createElement("label", null,
        react_1.default.createElement("input", { type: "radio", id: "dark", checked: darkThemeOn, onClick: () => changeTheme("dark") }),
        "Dark"),
    react_1.default.createElement("h2", { id: "temp" }, "Temperature:"),
    react_1.default.createElement("label", null,
        react_1.default.createElement("input", { type: "radio", id: "celsius", checked: showCelsius, onClick: () => changeTempUnits("Celsius") }),
        "Celsius"),
    react_1.default.createElement("label", null,
        react_1.default.createElement("input", { type: "radio", id: "fahr", checked: !showCelsius, onClick: () => changeTempUnits("Fahrenheit") }),
        "Fahrenheit"));
exports.default = Menu;
