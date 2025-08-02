export type {
  City,
  WeatherData,
}

interface City {
  id: string;
  lat: number;
  lon: number;
  pref: string;
  city: string;
}

interface WeatherData {
  temperature: number;
  description: string;
  precipitation: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  icon: string;
  cityName: string;
}
