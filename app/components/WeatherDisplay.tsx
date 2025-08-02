import Image from "next/image";
import { useWeather } from "@/hooks/useWeather";
import { useCityContext } from "@/contexts/CityContext";
import { Navigation2 } from "lucide-react";

export default function WeatherDisplay() {
  const { city } = useCityContext();
  const { weather, loading, error, refetch } = useWeather(
    city?.id,
    city?.lat,
    city?.lon
  );

  if (!city) return null;

  if (loading) return renderLoading();
  if (error) return renderError(error, () => refetch());
  if (!weather) return renderNoData();

  const rotate = {
    transform: `rotate(${weather.windDirection}deg)`,
  };

  return (
    <div className="rounded-lg border bg-card shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        {city.pref} {city.city}
      </h2>

      <div className="flex justify-around">
        <div className="flex items-center space-x-4">
          <Image
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="w-16 h-16"
            width={64}
            height={64}
          />
          <div>
            <div className="text-3xl font-bold">
              {weather.temperature}°C
            </div>
            <div className="capitalize">
              {weather.description}
            </div>
          </div>
        </div>

        <div className="border"></div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="">降水量</div>
            <div className="text-lg font-semibold">{weather.precipitation} mm/h</div>
          </div>
          <div className="text-center">
            <div className="">風速</div>
            <div className="flex justify-center items-center gap-2">
              <Navigation2 size={18} style={rotate} />
              <div className="text-lg font-semibold">{weather.windSpeed} m/s</div>
            </div>
          </div>
          <div className="text-center">
            <div className="">湿度</div>
            <div className="text-lg font-semibold">{weather.humidity}%</div>
          </div>
          <div className="text-center">
            <div className="">気圧</div>
            <div className="text-lg font-semibold">{weather.pressure} hPa</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderLoading() {
  return (
    <div className="flex items-center justify-center rounded-lg border py-8">
      <div className="text-muted-foreground">天気データを取得中...</div>
    </div>
  );
}
function renderError(error: string | null, onClick: () => void) {
  return (
    <div className="flex items-center space-x-2 text-destructive rounded-lg border py-4">
      <span>天気データ取得エラー: {error}</span>
      <button
        onClick={onClick}
        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
      >
        再試行
      </button>
    </div>
  );
}
function renderNoData() {
  return (
    <div className="flex items-center justify-center rounded-lg border py-8">
      <div className="text-red-500">天気データが存在しません</div>
    </div>
  );
}
