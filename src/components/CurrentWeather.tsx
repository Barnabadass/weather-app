import React from "react";
import { connect } from "react-redux";

// The constants that define the wind direction based on 360-degree model, where 0 is North, 180 is South.
// The direction is defined like this - if the number sent from the server is bigger than the first number in the array and smaller than the second one,
// the direction is the third element of the array.
const WIND_DIRS: [number, number, string][] = [[-1, 11.25, "North"], [11.25, 33, "North North-East"], [33, 56, "North-East"], [56, 78, "East North-East"], [78, 101, "East"],
[101, 123, "East South-East"], [123, 146, "South-East"], [146, 168, "South South-East"], [168, 191, "South"], [191, 213, "South South-West"],
[213, 236, "South-West"], [236, 258, "West South-West"], [258, 281, "West"], [281, 301, "West North-West"], [303, 326, "North-West"], [326, 348, "North North-West"], [348, 360, "North"]];

const CurrentWeather = ({ main, city, windDir, sunrise, sunset, windSpeed, temp, tempUnits }: CurrentWeatherProps) =>
  <div className="daily">
    <p id="cityname">{city}</p>
    <div className="main-info">
      {main === "Snow" && <i className='wi wi-snow fa-buttons'></i>}
      {main === "Rain" && <i className='wi wi-rain fa-buttons'></i>}
      {main === "Clear" && <i className='wi wi-day-sunny fa-buttons'></i>}
      {main === "Clouds" && <i className='wi wi-cloudy fa-buttons'></i>}
      <p className="temperature">
        {tempUnits === "Celsius" ? (temp - 273.15).toFixed(1) + " °C" : ((temp - 273.15) * 9 / 5 + 32).toFixed(1) + " °F"}
      </p>
    </div>
    <div id="wind-info">
      <p>{windSpeed + " m/s"}</p>
      <p>
        {WIND_DIRS.filter(windDirData => windDir > windDirData[0] && windDir <= windDirData[1])[0][2]}
      </p>
    </div>
    <div id="sun-info">
      <div className="sun-time">
        <i className='wi wi-sunrise fa-buttons'></i>
        <p className="pie">{new Date(sunrise).toString().split(" ").slice(4, 5).join(" ")}</p>
      </div>
      <div className="sun-time">
        <i className='wi wi-sunset fa-buttons'></i>
        <p className="pie">{new Date(sunset).toString().split(" ").slice(4, 5).join(" ")}</p>
      </div>
    </div>
  </div>

function mapStateToProps({ weather, tempUnits }: any, props: any) {
  const { main, city, windDir, windSpeed, sunset, sunrise, temp } = weather;
  return { main, city, windDir, windSpeed, sunset, sunrise, temp, tempUnits };
}

const ConnectedCurrentWeather = connect(mapStateToProps)(CurrentWeather);

export default ConnectedCurrentWeather;