import React from "react";
import { connect } from "react-redux";

const LocationSelectionScreen = ({ cityList, screen, getWeather }: LocationSelectionScreenProps) =>
  <div id="introduction">
    <h2 id="locationQuestion">
      {screen === "introduction" ? "Hello! Which is your current location?" : "Which is the right location?"}
    </h2>
    <div id="locationVariants">
      {cityList.map((cityname: string, index: number) =>
        <button
          className="locationVariantButton"
          onClick={() => getWeather(cityname)}
        >
          {cityname}
        </button>
      )}
    </div>
  </div>

function mapStateToProps({ cityList, screen }: any, props: any) {
  return { cityList, screen };
}

const ConnectedLocationSelectionScreen = connect(mapStateToProps)(LocationSelectionScreen);

export default ConnectedLocationSelectionScreen;