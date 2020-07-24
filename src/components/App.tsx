import React from "react";
import axios, { AxiosResponse } from "axios";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import Menu from "./Menu";
import TopPanel from "./TopPanel";
import LocationSelectionScreen from "./LocationSelectionScreen";
import ErrorDiv from "./ErrorDiv";
import MapScreen from "./MapScreen";
import { connect } from "react-redux";
import { changeScreen, setForecast, setCoords, setCityList, setWeather } from "../action_creators/action_creators";

class WeatherApp extends React.Component<WeatherAppProps> {
  constructor(props: any) {
    super(props);

    this.getWeather = this.getWeather.bind(this);
    this.getWeatherByCoords = this.getWeatherByCoords.bind(this);
    this.findOnMap = this.findOnMap.bind(this);
  }

  componentDidMount() {
    let lat: string;
    let lon: string;
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
  async getWeatherByCoords(lat: number | string, lon: number | string): Promise<void> {
    await axios.get("https://api.openweathermap.org/data/2.5/find?lat=" + lat + "&lon=" + lon + "&cnt=6&APPID=f739baeae1831e60546942e95f11ec01")
      .then((response: AxiosResponse) => {
        this.props.setCityList(response.data.list.map((i: any) => i.name));
      });
  }

  /**
   * Sends two requests for the weather data for the specified location.
   * These requests are sent when a user selects one of the settlements on the location selection screen
   * or types the name of the settlement in the input field and presses "Search"
   * 
   * @param cityname - string - the name of the settlement that the user requested the weather data for
   */
  getWeather(cityname: string): void {
    // the response is only sent if the input field is not empty
    if (cityname.trim() !== "") {
      // the request for the current weather data
      axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityname.trim() + "&APPID=f739baeae1831e60546942e95f11ec01")
        .then((response: AxiosResponse) => {
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
      axios.get("https://api.openweathermap.org/data/2.5/forecast?q=" + cityname.trim() + "&APPID=f739baeae1831e60546942e95f11ec01")
        .then((response: AxiosResponse) => {
          let forecastData: ForecastItem[] = [];
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
  async findOnMap(): Promise<void> {
    // when the user places a marker on the map, the state is updated with the coordinates of the marker,
    // so we just send the request with the coordinates from the state (which is passed as props to the element)
    await this.getWeatherByCoords(this.props.coords.lat, this.props.coords.lon);
    this.props.changeScreen("locationVariants");
  }

  render() {
    // the text color and the background are changed depending on the theme selected by the user in the menu
    let textColor: string = this.props.theme === "light" ? "black" : "white";
    let gradient: string = `linear-gradient(90deg, ${this.props.theme === "light" ? "#2bc0e4, #eaecc6" : "#4b6cb7, #182848"})`;
    return (
      <div id="main" style={{ background: gradient, color: textColor }}>
        <TopPanel getWeather={this.getWeather} />
        <CurrentWeather />
        <Forecast />
        {this.props.screen === "menu" && <Menu />}
        {(this.props.screen === "locationVariants" || this.props.screen === "introduction")
          && <LocationSelectionScreen getWeather={this.getWeather} />}
        {this.props.screen === "requestError" && <ErrorDiv />}
        {this.props.screen === "map" && <MapScreen findOnMap={this.findOnMap} />}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    changeScreen: (screen: string) => dispatch(changeScreen(screen)),
    setForecast: (forecast: ForecastItem[]) => dispatch(setForecast(forecast)),
    setCoords: (lat: string | number, lon: string | number) => dispatch(setCoords(lat, lon)),
    setCityList: (list: any[]) => dispatch(setCityList(list)),
    setWeather: (weather: any) => dispatch(setWeather(weather))
  };
}

function mapStateToProps({ theme, screen, coords }: any, props: any) {
  return { theme, screen, coords };
}

const ConnectedWeatherApp = connect(mapStateToProps, mapDispatchToProps)(WeatherApp);

export default ConnectedWeatherApp;