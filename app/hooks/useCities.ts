import { useQuery } from "@tanstack/react-query";
import type { City } from "@/app/types";

const fetchCities = async (): Promise<City[]> => {
  const response = await fetch("/cities.json");
  if (!response.ok) {
    throw new Error("都市データの取得に失敗しました");
  }
  return response.json();
};

export const useCities = () => {
  const {
    data: cities = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
    staleTime: Infinity
  });

  return {
    cities,
    loading,
    error: error?.message ?? null,
  };
};
