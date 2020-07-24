"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const CurrentWeather_1 = __importDefault(require("./CurrentWeather"));
const Forecast_1 = __importDefault(require("./Forecast"));
const Menu_1 = __importDefault(require("./Menu"));
const TopPanel_1 = __importDefault(require("./TopPanel"));
const LocationSelectionScreen_1 = __importDefault(require("./LocationSelectionScreen"));
const ErrorDiv_1 = __importDefault(require("./ErrorDiv"));
const MapScreen_1 = __importDefault(require("./MapScreen"));
const react_redux_1 = require("react-redux");
const action_creators_1 = require("../action_creators/action_creators");
class WeatherApp extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.getWeather = this.getWeather.bind(this);
        this.getWeatherByCoords = this.getWeatherByCoords.bind(this);
        this.findOnMap = this.findOnMap.bind(this);
    }
    componentDidMount() {
        let lat;
        let lon;
        // at first, we ask the user for his current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = String(position.coords.latitude);
                lon = String(position.coords.longitude);
            });
        }
        // then, we start an interval that will be cleared when we retrieve
        // the user`s current location and send a weather data request
        let firstRequest = setInterval(() => {
            if (lon !== undefined && lat !== undefined) {
                this.getWeatherByCoords(lat, lon);
                clearInterval(firstRequest);
            }
        }, 100);
    }
    /**
     * Sends a request to get a list of 6 settlements closest to the specified coordinates.
     * This request type was chosen after I found out that the weather API doesn`t determine the right
     * location if I make the request based on my coordinates
     * (I live in Yekaterinburg, but got the weather for some unknown "Poselok Rabochiy")
     *
     * @param lat - number/string - the latitude in the request`s coordinates
     * @param lon - number/string - the longitude in the request`s coordinates
     */
    getWeatherByCoords(lat, lon) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.get("https://api.openweathermap.org/data/2.5/find?lat=" + lat + "&lon=" + lon + "&cnt=6&APPID=f739baeae1831e60546942e95f11ec01")
                .then((response) => {
                this.props.setCityList(response.data.list.map((i) => i.name));
            });
        });
    }
    /**
     * Sends two requests for the weather data for the specified location.
     * These requests are sent when a user selects one of the settlements on the location selection screen
     * or types the name of the settlement in the input field and presses "Search"
     *
     * @param cityname - string - the name of the settlement that the user requested the weather data for
     */
    getWeather(cityname) {
        // the response is only sent if the input field is not empty
        if (cityname.trim() !== "") {
            // the request for the current weather data
            axios_1.default.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityname.trim() + "&APPID=f739baeae1831e60546942e95f11ec01")
                .then((response) => {
                this.props.setWeather({
                    city: cityname,
                    main: response.data.weather[0].main,
                    temp: response.data.main.temp,
                    windSpeed: response.data.wind.speed,
                    windDir: response.data.wind.deg,
                    sunrise: response.data.sys.sunrise * 1000,
                    sunset: response.data.sys.sunset * 1000
                });
                this.props.setCoords(response.data.coord.lat, response.data.coord.lon);
            }, error => {
                // in case there is no such settlement, we show the appropriate error message
                // and hide it 6 seconds later
                this.props.changeScreen("requestError");
                setTimeout(() => this.props.changeScreen("main"), 6000);
            });
            // the 5-day forecast request
            axios_1.default.get("https://api.openweathermap.org/data/2.5/forecast?q=" + cityname.trim() + "&APPID=f739baeae1831e60546942e95f11ec01")
                .then((response) => {
                let forecastData = [];
                for (var v of response.data.list) {
                    // the response contains information for every 3 hours, but I decided to increase
                    // the interval to 6 hours, otherwise the list seems too long
                    if (response.data.list.indexOf(v) % 2 === 1) {
                        forecastData.push(v);
                    }
                }
                this.props.setForecast(forecastData);
            })
                .then(() => {
                // when the information is received and updated on the main screen, we can hide other screens.
                // Thus the user won`t see the data on the main screen change 
                if (this.props.screen === "locationVariants" || this.props.screen === "introduction") {
                    this.props.changeScreen("main");
                }
            });
        }
    }
    /**
     * Sends a request when the user places a marker on the map and presses the "I got this" button
     */
    findOnMap() {
        return __awaiter(this, void 0, void 0, function* () {
            // when the user places a marker on the map, the state is updated with the coordinates of the marker,
            // so we just send the request with the coordinates from the state (which is passed as props to the element)
            yield this.getWeatherByCoords(this.props.coords.lat, this.props.coords.lon);
            this.props.changeScreen("locationVariants");
        });
    }
    render() {
        // the text color and the background are changed depending on the theme selected by the user in the menu
        let textColor = this.props.theme === "light" ? "black" : "white";
        let gradient = `linear-gradient(90deg, ${this.props.theme === "light" ? "#2bc0e4, #eaecc6" : "#4b6cb7, #182848"})`;
        return (react_1.default.createElement("div", { id: "main", style: { background: gradient, color: textColor } },
            react_1.default.createElement(TopPanel_1.default, { getWeather: this.getWeather }),
            react_1.default.createElement(CurrentWeather_1.default, null),
            react_1.default.createElement(Forecast_1.default, null),
            this.props.screen === "menu" && react_1.default.createElement(Menu_1.default, null),
            (this.props.screen === "locationVariants" || this.props.screen === "introduction")
                && react_1.default.createElement(LocationSelectionScreen_1.default, { getWeather: this.getWeather }),
            this.props.screen === "requestError" && react_1.default.createElement(ErrorDiv_1.default, null),
            this.props.screen === "map" && react_1.default.createElement(MapScreen_1.default, { findOnMap: this.findOnMap })));
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeScreen: (screen) => dispatch(action_creators_1.changeScreen(screen)),
        setForecast: (forecast) => dispatch(action_creators_1.setForecast(forecast)),
        setCoords: (lat, lon) => dispatch(action_creators_1.setCoords(lat, lon)),
        setCityList: (list) => dispatch(action_creators_1.setCityList(list)),
        setWeather: (weather) => dispatch(action_creators_1.setWeather(weather))
    };
}
function mapStateToProps({ theme, screen, coords }, props) {
    return { theme, screen, coords };
}
const ConnectedWeatherApp = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(WeatherApp);
exports.default = ConnectedWeatherApp;
