import React from "react";
import { connect } from "react-redux";

const Forecast = ({ forecast, tempUnits, city }: ForecastProps) =>
  <div>
    <h2 id='forc'>5 day forecast for {city}</h2>
    <div id='forecastDiv'>
      {forecast.map((item: ForecastItem) =>
        <div className='forec'>
          <p>
            {item['dt_txt'].replace(/(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})/,
              (nil: string, one: string, two: string, three: string, four: string, five: string, six: string) => {
                two = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][parseInt(two) - 1];
                return three + " " + two + " " + one + " " + four + ":" + five;
              })}
          </p>
          <p>{tempUnits === "Celsius" ? Number(item.main.temp - 273.15).toFixed(1) + " °C" : (Number(item.main.temp - 273.15) * 9 / 5 + 32).toFixed(1) + " °F"}</p>
          <div className='main-weather-forec'>
            <p>
              {item.weather[0].main === "Snow" && <i className='wi wi-snow fa-buttons'></i>}
              {item.weather[0].main === "Rain" && <i className='wi wi-rain fa-buttons'></i>}
              {item.weather[0].main === "Clear" && <i className='wi wi-day-sunny fa-buttons'></i>}
              {item.weather[0].main === "Clouds" && <i className='wi wi-cloudy fa-buttons'></i>}
            </p>
            <p>{item.weather[0].main}</p>
          </div>
        </div>)}
    </div>
  </div>

  function mapStateToProps({ tempUnits, forecast, weather }: any, props: any) {
    return { tempUnits, forecast, city: weather.city };
  }

  const ConnectedForecast = connect(mapStateToProps)(Forecast);

  export default ConnectedForecast;