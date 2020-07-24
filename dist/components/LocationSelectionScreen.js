"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const LocationSelectionScreen = ({ cityList, screen, getWeather }) => react_1.default.createElement("div", { id: "introduction" },
    react_1.default.createElement("h2", { id: "locationQuestion" }, screen === "introduction" ? "Hello! Which is your current location?" : "Which is the right location?"),
    react_1.default.createElement("div", { id: "locationVariants" }, cityList.map((cityname, index) => react_1.default.createElement("button", { className: "locationVariantButton", style: {
            left: (250 + Math.cos((index / 6) * 2 * Math.PI) * 160) + "px",
            top: (400 + Math.sin((index / 6) * 2 * Math.PI) * 160) + "px"
        }, onClick: () => getWeather(cityname) }, cityname))));
function mapStateToProps({ cityList, screen }, props) {
    return { cityList, screen };
}
const ConnectedLocationSelectionScreen = react_redux_1.connect(mapStateToProps)(LocationSelectionScreen);
exports.default = ConnectedLocationSelectionScreen;
