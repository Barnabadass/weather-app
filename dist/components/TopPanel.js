"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const action_creators_1 = require("../action_creators/action_creators");
const TopPanel = ({ toggleMenu, toggleMap, handleChange, getWeather, currentCity, theme }) => react_1.default.createElement("div", { id: "top" },
    react_1.default.createElement("button", { className: "top-buttons", onClick: toggleMenu },
        react_1.default.createElement("i", { className: "fa fa-bars fa-buttons", style: { color: theme === "light" ? "black" : "white" } })),
    react_1.default.createElement("button", { className: "top-buttons", id: "mapOpen", onClick: toggleMap },
        react_1.default.createElement("i", { className: "fa fa-map fa-buttons", style: { color: theme === "light" ? "black" : "white" } })),
    react_1.default.createElement("input", { type: "text", id: "search-input", onChange: handleChange, placeholder: "Type the name of the city...", style: { color: theme === "light" ? "black" : "white" } }),
    react_1.default.createElement("button", { id: "search-button", className: "top-buttons", onClick: () => getWeather(currentCity) },
        react_1.default.createElement("i", { className: "fa fa-search fa-buttons", style: { color: theme === "light" ? "black" : "white" } })));
function mapDispatchToProps(dispatch) {
    return {
        toggleMenu: () => dispatch(action_creators_1.changeScreen("menu")),
        toggleMap: () => dispatch(action_creators_1.changeScreen("map")),
        handleChange: (event) => dispatch(action_creators_1.handleTextInput(event.target.value))
    };
}
function mapStateToProps({ screen, theme, input }, props) {
    return { screen, theme, currentCity: input };
}
const ConnectedTopPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TopPanel);
exports.default = ConnectedTopPanel;
