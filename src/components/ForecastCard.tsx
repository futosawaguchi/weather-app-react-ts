import type { ForecastItem } from '../types/weather'

interface ForecastCardProps {
  forecast: ForecastItem[]
}

function ForecastCard({ forecast }: ForecastCardProps) {
  // 5日間予報は3時間ごとのデータが返ってくるので
  // 1日1つだけ（正午12:00のデータ）に絞り込む
  const dailyForecast = forecast.filter((item) =>
    item.dt_txt.includes('12:00:00')
  )

  return (
    <div className="bg-white/20 rounded-2xl p-6 text-white">
      <h3 className="text-lg font-semibold mb-4">5日間の予報</h3>
      <div className="grid grid-cols-5 gap-2">
        {dailyForecast.map((item) => {
          const date = new Date(item.dt * 1000)
          const month = date.getMonth() + 1
          const day = date.getDate()
          const temp = Math.round(item.main.temp)

          return (
            <div
              key={item.dt}
              className="bg-white/10 rounded-xl p-3 text-center"
            >
              <p className="text-white/60 text-sm">{month}/{day}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="w-10 h-10 mx-auto"
              />
              <p className="text-lg font-semibold">{temp}°C</p>
              <p className="text-white/60 text-xs capitalize">
                {item.weather[0].description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForecastCard