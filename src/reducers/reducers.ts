function screen(screen: string = "introduction", action: any): string {
  return action.screen || screen;
}

function theme(theme: string = "dark", action: any): string {
  switch (action.type) {
    case "changeThemeLight":
      return "light";
    case "changeThemeDark":
      return "dark";
    default:
      return theme;
  }
}

function tempUnits(units: string = "Celsius", action: any): string {
  return action.units || units;
}

function input(input: string = "", action: any): string {
  return action.input || input;
}

function forecast(forecast: ForecastItem[] = [], action: any): ForecastItem[] {
  return action.forecast || forecast;
}

function coords(coord: { [prop: string]: string | number } = { lat: 0, lon: 0 }, action: any): { [prop: string]: string | number } {
  return action.lat === undefined ? coord : { lat: action.lat, lon: action.lon };
}

function cityList(list: string[] = [], action: any): string[] {
  return action.list || list;
}

const defaultWeather = {
  city: "",
  main: "",
  temp: 0,
  windSpeed: 0,
  windDir: 0,
  sunrise: 0,
  sunset: 0
};

function weather(weather: any = defaultWeather, action: any): any {
  return action.weather || weather;
}

export { screen, theme, tempUnits, input, forecast, coords, cityList, weather };