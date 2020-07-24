"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeThemeDark = exports.changeThemeLight = exports.toggleLocationVariants = exports.toggleMap = exports.toggleMenu = void 0;
function toggleMenu() {
    return { type: "toggleMenu" };
}
exports.toggleMenu = toggleMenu;
function toggleMap() {
    return { type: "toggleMap" };
}
exports.toggleMap = toggleMap;
function toggleLocationVariants() {
    return { type: "toggleLocationVariants" };
}
exports.toggleLocationVariants = toggleLocationVariants;
function changeThemeDark() {
    return { type: "changeThemeDark" };
}
exports.changeThemeDark = changeThemeDark;
function changeThemeLight() {
    return { type: "changeThemeLight" };
}
exports.changeThemeLight = changeThemeLight;
