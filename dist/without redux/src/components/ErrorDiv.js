"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ErrorDiv = () => react_1.default.createElement("div", { className: "oops" }, `We couldn't find your location.
     Please check if you have misspelled the name.
      Try looking for it on the map?`);
exports.default = ErrorDiv;
