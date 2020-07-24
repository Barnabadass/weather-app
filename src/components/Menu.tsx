import React from "react";
import { connect } from "react-redux";
import { changeScreen, changeThemeLight, changeThemeDark, changeTempUnits } from "../action_creators/action_creators";

const Menu = ({ theme, tempUnits, toggleMenu, changeThemeLight, changeThemeDark, changeTempUnits }: MenuProps) =>
  <div id="menu" style={{ background: theme === "light" ? "white" : "linear-gradient(90deg, #4b6cb7, #182848)", color: theme === "light" ? "black" : "white" }}>
    <button className="top-buttons" onClick={toggleMenu} id="bars-button">
      <i className="fa fa-bars fa-buttons" style={{ color: theme === "light" ? "black" : "white" }} />
    </button>
    <h2 id="theme">Theme:</h2>
    <label><input type="radio" id="light" checked={theme === "light"} onClick={changeThemeLight} />Light</label>
    <label><input type="radio" id="dark" checked={theme === "dark"} onClick={changeThemeDark} />Dark</label>
    <h2 id="temp">Temperature:</h2>
    <label><input type="radio" id="celsius" checked={tempUnits === "Celsius"} onClick={() => changeTempUnits("Celsius")} />Celsius</label>
    <label><input type="radio" id="fahr" checked={tempUnits !== "Celsius"} onClick={() => changeTempUnits("Fahrenheit")} />Fahrenheit</label>
  </div>

function mapDispatchToProps(dispatch: any) {
  return {
    toggleMenu: () => dispatch(changeScreen("main")),
    changeThemeLight: () => dispatch(changeThemeLight()),
    changeThemeDark: () => dispatch(changeThemeDark()),
    changeTempUnits: (units: string) => dispatch(changeTempUnits(units))
  };
}

function mapStateToProps(state: any, props: any) {
  return { 
    theme: state.theme,
    tempUnits: state.tempUnits
   };
}

const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default ConnectedMenu;