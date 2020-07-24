declare global {
  interface CurrentWeatherProps {
    main: string,
    city: string,
    windDir: number,
    sunrise: number,
    sunset: number,
    windSpeed: number,
    temp: number,
    tempUnits: string
  }

  interface ForecastItem {
    clouds: { all: number },
    dt: number,
    dt_txt: string,
    main: { [prop: string]: number },
    sys: { pod: string },
    weather: { [prop: string]: number | string }[],
    wind: { speed: number, deg: number }
  }

  interface ForecastProps {
    city: string,
    tempUnits: string,
    forecast: ForecastItem[]
  }

  interface MenuProps {
    theme: string,
    tempUnits: string,
    toggleMenu: () => void,
    changeThemeLight: () => void,
    changeThemeDark: () => void,
    changeTempUnits: (tempUnits: string) => void
  }

  interface TopPanelProps {
    currentCity: string,
    theme: string,
    toggleMenu: () => void,
    toggleMap: () => void,
    handleChange: (event: any) => void,
    getWeather: (cityname: string) => void
  }

  interface LocationSelectionScreenProps {
    cityList: string[],
    screen: string,
    getWeather: (cityname: string) => void
  }

  interface MapScreenProps {
    findOnMap: () => void,
    toggleMap: () => void,
    setMarker: (event: any) => void,
    lat: number,
    lon: number
  }

  interface WeatherAppProps {
    screen: string, 
    theme: string,
    coords: { [prop: string]: string | number }
    toggleMenu: () => void,
    changeScreen: (screen: string) => void,
    setForecast: (forecast: ForecastItem[]) => void,
    setCoords: (lat: string | number, lon: string | number) => void,
    setCityList: (list: any[]) => void,
    setWeather: (weather: any) => void
  }
}

export { };