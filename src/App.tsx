import { useState } from 'react'
import type { WeatherData, ForecastData } from './types/weather'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'

// 天気に応じた背景色
const getBackgroundClass = (weatherMain: string): string => {
  switch (weatherMain) {
    case 'Clear':
      return 'from-yellow-400 to-orange-400'
    case 'Clouds':
      return 'from-gray-400 to-gray-600'
    case 'Rain':
    case 'Drizzle':
      return 'from-blue-400 to-blue-700'
    case 'Thunderstorm':
      return 'from-gray-700 to-gray-900'
    case 'Snow':
      return 'from-blue-100 to-blue-300'
    default:
      return 'from-blue-400 to-indigo-600'
  }
}

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('searchHistory')
    return saved ? JSON.parse(saved) : []
  })

  // 天気データを取得する関数
  const fetchWeather = async (city: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // 現在の天気を取得
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ja`
      )

      if (!weatherRes.ok) {
        throw new Error('都市が見つかりませんでした')
      }

      const weatherData: WeatherData = await weatherRes.json()

      // 5日間予報を取得
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ja`
      )
      const forecastData: ForecastData = await forecastRes.json()

      setWeather(weatherData)
      setForecast(forecastData)

      // 検索履歴を更新
      const newHistory = [
        city,
        ...history.filter((h) => h !== city)
      ].slice(0, 5)  // 最大5件
      setHistory(newHistory)
      localStorage.setItem('searchHistory', JSON.stringify(newHistory))

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('エラーが発生しました')
      }
      setWeather(null)
      setForecast(null)
    } finally {
      setIsLoading(false)
    }
  }

  // 現在地の天気を取得する関数
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('お使いのブラウザは現在地取得に対応していません')
      return
    }

    setIsLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ja`
          )
          const weatherData: WeatherData = await weatherRes.json()

          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ja`
          )
          const forecastData: ForecastData = await forecastRes.json()

          setWeather(weatherData)
          setForecast(forecastData)
        } catch {
          setError('天気データの取得に失敗しました')
        } finally {
          setIsLoading(false)
        }
      },
      () => {
        setError('現在地の取得に失敗しました')
        setIsLoading(false)
      }
    )
  }

  const bgClass = weather
    ? getBackgroundClass(weather.weather[0].main)
    : 'from-blue-400 to-indigo-600'

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgClass} transition-all duration-1000`}>
      <div className="max-w-lg mx-auto px-4 py-12">

        {/* タイトル */}
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          天気アプリ
        </h1>

        {/* 検索バー */}
        <div className="mb-6">
          <SearchBar
            onSearch={fetchWeather}
            onGetCurrentLocation={fetchCurrentLocation}
            isLoading={isLoading}
          />
        </div>

        {/* 検索履歴 */}
        {history.length > 0 && (
          <div className="mb-6">
            <p className="text-white/60 text-sm mb-2">最近の検索</p>
            <div className="flex flex-wrap gap-2">
              {history.map((city) => (
                <button
                  key={city}
                  onClick={() => fetchWeather(city)}
                  className="px-3 py-1 bg-white/20 text-white text-sm rounded-full hover:bg-white/30 transition-colors cursor-pointer"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* エラー表示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-400/30 text-white rounded-xl text-center">
            {error}
          </div>
        )}

        {/* ローディング表示 */}
        {isLoading && (
          <div className="text-center text-white py-12">
            <p className="text-xl">取得中...</p>
          </div>
        )}

        {/* 天気カード */}
        {weather && !isLoading && (
          <div className="flex flex-col gap-4">
            <WeatherCard weather={weather} />
            {forecast && <ForecastCard forecast={forecast.list} />}
          </div>
        )}

      </div>
    </div>
  )
}

export default App