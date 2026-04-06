import type { WeatherData } from '../types/weather'

interface WeatherCardProps {
  weather: WeatherData
}

function WeatherCard({ weather }: WeatherCardProps) {
  // 気温を小数点1桁に丸める
  const temp = Math.round(weather.main.temp)
  const feelsLike = Math.round(weather.main.feels_like)

  return (
    <div className="bg-white/20 rounded-2xl p-6 text-white">
      {/* 都市名・国名 */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold">
          {weather.name}, {weather.sys.country}
        </h2>
      </div>

      {/* 天気アイコンと気温 */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="w-20 h-20"
        />
        <div>
          <p className="text-7xl font-bold">{temp}°C</p>
          <p className="text-white/70 capitalize text-lg">
            {weather.weather[0].description}
          </p>
        </div>
      </div>

      {/* 詳細情報 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-white/60 text-sm">体感温度</p>
          <p className="text-xl font-semibold">{feelsLike}°C</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-white/60 text-sm">湿度</p>
          <p className="text-xl font-semibold">{weather.main.humidity}%</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-white/60 text-sm">風速</p>
          <p className="text-xl font-semibold">{weather.wind.speed}m/s</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard