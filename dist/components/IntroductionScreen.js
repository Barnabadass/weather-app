"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const IntroductionScreen = ({ cityList, getWeather }) => react_1.default.createElement("div", { id: "introduction" },
    react_1.default.createElement("h1", { id: "welcome" }, "Hello!"),
    react_1.default.createElement("h2", { id: "locationQuestion" }, "Which is your current location?"),
    react_1.default.createElement("div", { id: "locationVariants" }, cityList.map((cityname, index) => react_1.default.createElement("button", { className: "locationVariantButton", style: {
            left: (250 + Math.cos((index / 6) * 2 * Math.PI) * 120) + "px",
            top: (380 + Math.sin((index / 6) * 2 * Math.PI) * 120) + "px"
        }, onClick: () => getWeather(cityname) }, cityname))));
exports.default = IntroductionScreen;
