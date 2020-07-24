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
        this.state = {
            data: {},
            cityList: [],
            forecast: [],
            screen: "locationVariants",
            theme: "dark",
            tempUnits: 'Celsius',
            input: "",
            city: "",
            main: "",
            windSpeed: 0,
            windDir: 0,
            sunrise: 0,
            sunset: 0,
            temp: 0,
            lat: 0,
            lon: 0
        };
        this.getWeather = this.getWeather.bind(this);
        this.getWeatherByCoords = this.getWeatherByCoords.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.changeTheme = this.changeTheme.bind(this);
        this.changeTempUnits = this.changeTempUnits.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.findOnMap = this.findOnMap.bind(this);
        this.toggleMap = this.toggleMap.bind(this);
        this.setMarker = this.setMarker.bind(this);
    }
    componentDidMount() {
        let lat;
        let lon;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = String(position.coords.latitude);
                lon = String(position.coords.longitude);
            });
        }
        let firstRequest = setInterval(() => {
            if (lon !== undefined && lat !== undefined) {
                this.getWeatherByCoords(lat, lon);
                clearInterval(firstRequest);
            }
        }, 100);
    }
    getWeatherByCoords(lat, lon) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default.get("https://api.openweathermap.org/data/2.5/find?lat=" + lat + "&lon=" + lon + "&cnt=6&APPID=f739baeae1831e60546942e95f11ec01")
                .then((response) => {
                this.setState({ cityList: response.data.list.map((i) => i.name) });
            });
        });
    }
    getWeather(cityname) {
        if (cityname.trim() !== "") {
            axios_1.default.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityname.trim() + "&APPID=f739baeae1831e60546942e95f11ec01")
                .then((response) => {
                this.setState({
                    data: response.data,
                    city: cityname,
                    main: response.data.weather[0].main,
                    temp: response.data.main.temp,
                    windSpeed: response.data.wind.speed,
                    windDir: response.data.wind.deg,
                    sunrise: response.data.sys.sunrise * 1000,
                    sunset: response.data.sys.sunset * 1000,
                    lat: response.data.coord.lat,
                    lon: response.data.coord.lon
                });
            }, error => {
                //   this.setState({ screen: "requestError" });
                setTimeout(() => { }
                // this.setState({ screen: "main" })
                , 6000);
            });
            axios_1.default.get("https://api.openweathermap.org/data/2.5/forecast?q=" + cityname.trim() + "&APPID=f739baeae1831e60546942e95f11ec01")
                .then((response) => {
                let forecastData = [];
                for (var v of response.data.list) {
                    if (response.data.list.indexOf(v) % 2 === 1) {
                        forecastData.push(v);
                    }
                }
                this.setState({ forecast: forecastData });
            })
                .then(() => this.props.toggleLocationVariants());
        }
    }
    toggleMap() {
        /*  this.setState((prevState: any) => ({
            screen: prevState.screen === "map" ? "main" : "map"
           })); */
    }
    toggleMenu() {
        console.log(this.props);
        this.props.toggleMenu();
    }
    setMarker(event) {
        //  this.setState({ lat: event.latLng.lat(), lon: event.latLng.lng() });
    }
    findOnMap() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getWeatherByCoords(this.state.lat, this.state.lon);
            this.props.toggleLocationVariants();
        });
    }
    handleChange(event) {
        //   this.setState({ input: event.target.value });
    }
    changeTheme(theme) {
        // this.setState({ theme });
    }
    changeTempUnits(tempUnits) {
        //  this.setState({ tempUnits });
    }
    render() {
        let celschecked = this.state.tempUnits === 'Celsius';
        let darkchecked = this.state.theme === "dark";
        let menuTheme = this.state.theme === "light" ? "white" : "linear-gradient(90deg, #4b6cb7, #182848)";
        let textColor = this.state.theme === "light" ? "black" : "white";
        let gradient = this.state.theme === "light" ? "linear-gradient(90deg, #2bc0e4, #eaecc6)" : "linear-gradient(90deg, #4b6cb7, #182848)";
        return (react_1.default.createElement("div", { id: "main", style: { background: gradient, color: textColor } },
            react_1.default.createElement(TopPanel_1.default, { textColor: textColor, currentCity: this.state.input, handleChange: this.handleChange, getWeather: this.getWeather }),
            react_1.default.createElement(CurrentWeather_1.default, { main: this.state.main, name: this.state.city, windDir: this.state.windDir, sunrise: this.state.sunrise, sunset: this.state.sunset, windSpeed: this.state.windSpeed, temp: this.state.temp, tempUnits: this.state.tempUnits }),
            react_1.default.createElement(Forecast_1.default, { city: this.state.city, tempUnits: this.state.tempUnits, forecast: this.state.forecast }),
            this.props.screen === "menu" &&
                react_1.default.createElement(Menu_1.default, { color: textColor, showCelsius: celschecked, changeTempUnits: this.changeTempUnits }),
            (this.props.screen === "locationVariants") &&
                react_1.default.createElement(LocationSelectionScreen_1.default, { text: this.state.lat === 0 ? "Hello! Which is your current location?" : "Which is the correct location?", cityList: this.state.cityList, getWeather: this.getWeather }),
            this.props.screen === "requestError" &&
                react_1.default.createElement(ErrorDiv_1.default, null),
            this.props.screen === "map" &&
                react_1.default.createElement(MapScreen_1.default, { findOnMap: this.findOnMap, setMarker: this.setMarker, lat: this.state.lat, lon: this.state.lon })));
    }
}
function mapDispatchToProps(dispatch) {
    return {
        toggleLocationVariants: () => dispatch(action_creators_1.toggleLocationVariants())
    };
}
function mapStateToProps(state, props) {
    return {
        screen: state.screen
    };
}
const ConnectedWeatherApp = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(WeatherApp);
exports.default = ConnectedWeatherApp;
