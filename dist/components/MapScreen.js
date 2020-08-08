"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_google_maps_1 = require("react-google-maps");
const react_redux_1 = require("react-redux");
const action_creators_1 = require("../action_creators/action_creators");
const Map = react_google_maps_1.withScriptjs(react_google_maps_1.withGoogleMap((props) => react_1.default.createElement(react_google_maps_1.GoogleMap, { defaultZoom: 8, defaultCenter: { lat: props.lat, lng: props.lon }, onClick: props.setMarker },
    react_1.default.createElement(react_google_maps_1.Marker, { position: { lat: props.lat, lng: props.lon } }))));
const MapScreen = ({ findOnMap, setMarker, toggleMap, lat, lon }) => react_1.default.createElement("div", { id: "map-div" },
    react_1.default.createElement("h1", { id: "directions" }, "Point at the place you want the weather for"),
    react_1.default.createElement(Map, { googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWC26M99rjI11jofyE_NbEJg2f6INo0FI", containerElement: react_1.default.createElement("div", { id: "map" }), loadingElement: react_1.default.createElement("div", { style: { height: `400px` } }), mapElement: react_1.default.createElement("div", { style: { height: `100%` } }), setMarker: setMarker, lat: lat, lon: lon }),
    react_1.default.createElement("div", { id: "map-screen-buttons" },
        react_1.default.createElement("button", { id: "find-on-map", onClick: findOnMap }, "I got this!"),
        react_1.default.createElement("button", { id: "cancel-button", onClick: toggleMap }, "Go back")));
function mapDispatchToProps(dispatch) {
    return {
        toggleMap: () => dispatch(action_creators_1.changeScreen("main")),
        setMarker: (event) => dispatch(action_creators_1.setCoords(event.latLng.lat(), event.latLng.lng()))
    };
}
function mapStateToProps({ screen, coords }, props) {
    return { screen, lat: coords.lat, lon: coords.lon };
}
const ConnectedMapScreen = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MapScreen);
exports.default = ConnectedMapScreen;
