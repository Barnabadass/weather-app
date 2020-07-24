"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeThemeReducer = exports.changeScreenReducer = void 0;
function changeScreenReducer(state = "locationVariants", action) {
    switch (action.type) {
        case "toggleMenu":
            return state === "menu" ? "main" : "menu";
        case "toggleMap":
            return state === "map" ? "main" : "map";
        case "toggleLocationVariants":
            return state === "locationVariants" ? "main" : "locationVariants";
        default:
            return state;
    }
}
exports.changeScreenReducer = changeScreenReducer;
function changeThemeReducer(theme = "dark", action) {
    switch (action.type) {
        case "changeThemeLight":
            return "light";
        default:
            return "dark";
    }
}
exports.changeThemeReducer = changeThemeReducer;
