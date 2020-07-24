function changeScreen(screen: string): { type: string, screen: string } {
  return { type: "toggleScreen", screen };
}

function changeThemeDark(): { type: string } {
  return { type: "changeThemeDark" };
}

function changeThemeLight(): { type: string } {
  return { type: "changeThemeLight" };
}

function changeTempUnits(units: string): { type: string, units: string } {
  return { type: "changeTempUnits", units };
}

function handleTextInput(input: string): { type: string, input: string } {
  return { type: "handleTextInput", input };
}

function setForecast(forecast: ForecastItem[]): { type: string, forecast: ForecastItem[] } {
  return { type: "setForecast", forecast };
}

function setCoords(lat: string | number, lon: string | number): { type: string, lat: string | number, lon: string | number } {
  return { type: "setCoords", lat, lon };
}

function setCityList(list: string[]): { type: string, list: string[] } {
  return { type: "setCityList", list };
}

function setWeather(weather: any): { type: string, weather: any } {
  return { type: "setWeather", weather };
}

export {
  changeScreen,
  changeThemeLight,
  changeThemeDark,
  changeTempUnits,
  handleTextInput,
  setForecast,
  setCoords,
  setCityList,
  setWeather
};