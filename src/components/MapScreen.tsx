import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { connect } from "react-redux";
import { changeScreen, setCoords } from "../action_creators/action_creators";

const Map = withScriptjs(withGoogleMap((props: any) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.lat, lng: props.lon }}
    onClick={props.setMarker}>
    <Marker position={{ lat: props.lat, lng: props.lon }} />
  </GoogleMap>
));

const MapScreen = ({ findOnMap, setMarker, toggleMap, lat, lon }: MapScreenProps) =>
  <div id="map-div">
    <h1 id="directions">Point at the place you want the weather for</h1>
    <Map
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWC26M99rjI11jofyE_NbEJg2f6INo0FI"
      containerElement={<div id="map" />}
      loadingElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      setMarker={setMarker}
      lat={lat}
      lon={lon}
    />
    <div id="map-screen-buttons">
      <button id="find-on-map" onClick={findOnMap}>I got this!</button>
      <button id="cancel-button" onClick={toggleMap}>Go back</button>
    </div>
  </div>

function mapDispatchToProps(dispatch: any) {
  return {
    toggleMap: () => dispatch(changeScreen("main")),
    setMarker: (event: any) => dispatch(setCoords(event.latLng.lat(), event.latLng.lng()))
  };
}

function mapStateToProps({ screen, coords }: any, props: any) {
  return { screen, lat: coords.lat, lon: coords.lon };
}

const ConnectedMapScreen = connect(mapStateToProps, mapDispatchToProps)(MapScreen);

export default ConnectedMapScreen;