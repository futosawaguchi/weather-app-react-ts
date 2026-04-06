// 現在の天気のAPI レスポンスの型
export interface WeatherData {
  name: string
  main: {
    temp: number
    humidity: number
    feels_like: number
  }
  weather: {
    description: string
    icon: string
    main: string
  }[]
  wind: {
    speed: number
  }
  sys: {
    country: string
  }
}

// 5日間予報の1つ分の型
export interface ForecastItem {
  dt: number
  main: {
    temp: number
    humidity: number
  }
  weather: {
    description: string
    icon: string
    main: string
  }[]
  dt_txt: string
}

// 5日間予報のAPIレスポンスの型
export interface ForecastData {
  list: ForecastItem[]
}