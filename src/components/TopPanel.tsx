import React from "react";
import { connect } from "react-redux";
import { changeScreen, handleTextInput } from "../action_creators/action_creators";

const TopPanel = ({ toggleMenu, toggleMap, handleChange, getWeather, currentCity, theme }: TopPanelProps) =>
  <div id="top">
    <button className="top-buttons" onClick={toggleMenu}>
      <i className="fa fa-bars fa-buttons" style={{ color: theme === "light" ? "black" : "white" }}></i>
    </button>
    <button className="top-buttons" id="mapOpen" onClick={toggleMap}>
      <i className="fa fa-map fa-buttons" style={{ color: theme === "light" ? "black" : "white" }}></i>
    </button>
    <input
      type="text"
      id="search-input"
      onChange={handleChange}
      placeholder="Type the name of the city..."
      style={{ color: theme === "light" ? "black" : "white" }}
    />
    <button id="search-button" className="top-buttons" onClick={() => getWeather(currentCity)}>
      <i className="fa fa-search fa-buttons" style={{ color: theme === "light" ? "black" : "white" }}></i>
    </button>
  </div>

function mapDispatchToProps(dispatch: any) {
  return {
    toggleMenu: () => dispatch(changeScreen("menu")),
    toggleMap: () => dispatch(changeScreen("map")),
    handleChange: (event: any) => dispatch(handleTextInput(event.target.value))
  };
}

function mapStateToProps({ screen, theme, input }: any, props: any) {
  return { screen, theme, currentCity: input };
}

const ConnectedTopPanel = connect(mapStateToProps, mapDispatchToProps)(TopPanel);
export default ConnectedTopPanel;