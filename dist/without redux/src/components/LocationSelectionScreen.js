"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const LocationSelectionScreen = ({ cityList, getWeather, text }) => react_1.default.createElement("div", { id: "introduction" },
    react_1.default.createElement("h2", { id: "locationQuestion" }, text),
    react_1.default.createElement("div", { id: "locationVariants" }, cityList.map((cityname, index) => react_1.default.createElement("button", { className: "locationVariantButton", style: {
            left: ((window.innerWidth / 2) + Math.cos((index / 6) * 2 * Math.PI) * 160) + "px",
            top: ((window.innerHeight / 2) + Math.sin((index / 6) * 2 * Math.PI) * 160) + "px"
        }, onClick: () => getWeather(cityname) }, cityname))));
exports.default = LocationSelectionScreen;
