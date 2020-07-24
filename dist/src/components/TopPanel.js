"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const action_creators_1 = require("../action_creators/action_creators");
const TopPanel = ({ toggleMenu, textColor, toggleMap, handleChange, getWeather, currentCity }) => react_1.default.createElement("div", { id: "top" },
    react_1.default.createElement("button", { className: "top-buttons", onClick: toggleMenu },
        react_1.default.createElement("i", { className: "fa fa-bars fa-buttons", style: { color: textColor } })),
    react_1.default.createElement("button", { className: "top-buttons", id: "mapOpen", onClick: toggleMap },
        react_1.default.createElement("i", { className: "fa fa-map fa-buttons", style: { color: textColor } })),
    react_1.default.createElement("input", { type: "text", id: "search-input", onChange: handleChange, placeholder: "Type the name of the city...", style: { color: textColor } }),
    react_1.default.createElement("button", { id: "search-button", className: "top-buttons", onClick: () => getWeather(currentCity) },
        react_1.default.createElement("i", { className: "fa fa-search fa-buttons", style: { color: textColor } })));
function mapDispatchToProps(dispatch) {
    return {
        toggleMenu: () => dispatch(action_creators_1.toggleMenu()),
        toggleMap: () => dispatch(action_creators_1.toggleMap())
    };
}
function mapStateToProps(state, props) {
    return {
        screen: state.screen
    };
}
const ConnectedTopPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TopPanel);
exports.default = ConnectedTopPanel;
