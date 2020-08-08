"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const action_creators_1 = require("../action_creators/action_creators");
const Menu = ({ theme, tempUnits, toggleMenu, changeThemeLight, changeThemeDark, changeTempUnits }) => react_1.default.createElement("div", { id: "menu", style: { background: theme === "light" ? "white" : "linear-gradient(90deg, #4b6cb7, #182848)", color: theme === "light" ? "black" : "white" } },
    react_1.default.createElement("nav", { id: "menu-nav" },
        react_1.default.createElement("button", { className: "top-buttons", onClick: toggleMenu, id: "bars-button" },
            react_1.default.createElement("i", { className: "fa fa-bars fa-buttons", style: { color: theme === "light" ? "black" : "white" } }))),
    react_1.default.createElement("h2", { id: "theme" }, "Theme:"),
    react_1.default.createElement("label", null,
        react_1.default.createElement("input", { type: "radio", id: "light", checked: theme === "light", onClick: changeThemeLight }),
        "Light"),
    react_1.default.createElement("label", null,
        react_1.default.createElement("input", { type: "radio", id: "dark", checked: theme === "dark", onClick: changeThemeDark }),
        "Dark"),
    react_1.default.createElement("h2", { id: "temp" }, "Temperature:"),
    react_1.default.createElement("label", null,
        react_1.default.createElement("input", { type: "radio", id: "celsius", checked: tempUnits === "Celsius", onClick: () => changeTempUnits("Celsius") }),
        "Celsius"),
    react_1.default.createElement("label", null,
        react_1.default.createElement("input", { type: "radio", id: "fahr", checked: tempUnits !== "Celsius", onClick: () => changeTempUnits("Fahrenheit") }),
        "Fahrenheit"));
function mapDispatchToProps(dispatch) {
    return {
        toggleMenu: () => dispatch(action_creators_1.changeScreen("main")),
        changeThemeLight: () => dispatch(action_creators_1.changeThemeLight()),
        changeThemeDark: () => dispatch(action_creators_1.changeThemeDark()),
        changeTempUnits: (units) => dispatch(action_creators_1.changeTempUnits(units))
    };
}
function mapStateToProps(state, props) {
    return {
        theme: state.theme,
        tempUnits: state.tempUnits
    };
}
const ConnectedMenu = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Menu);
exports.default = ConnectedMenu;
