import { useQuery } from "@tanstack/react-query";
import type { WeatherData } from "@/app/types";

const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  const url = `/api/weather?lat=${lat}&lon=${lon}`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "天気データの取得に失敗しました");
  }

  const data: WeatherData = await response.json();
  return data;
};

export const useWeather = (id?: string, lat?: number, lon?: number) => {
  const {
    data: weather,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["weather", id ?? "unknown"],
    queryFn: () => fetchWeather(lat!, lon!),
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  return {
    weather: weather ?? null,
    loading,
    error: error?.message ?? null,
    refetch,
  };
};
