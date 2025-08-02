import { NextResponse } from "next/server";
export const runtime = "edge";

interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  rain?: {
    "1h": number;
  }
  name: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ message: "Latitude and longitude are required." }, { status: 400 });
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!API_KEY) {
    console.error("OpenWeatherMap API key is not set in environment variables.");
    return NextResponse.json({ message: "Server configuration error: missing API key." }, { status: 500 });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenWeatherMap API error:", errorData);
      return NextResponse.json({ message: "Failed to fetch weather data from external API." }, { status: response.status });
    }

    const data: OpenWeatherResponse = await response.json();

    const weatherData = {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      precipitation: data.rain?.["1h"] ?? 0,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      icon: data.weather[0].icon,
      cityName: data.name
    };

    return NextResponse.json(weatherData, { status: 200 });
  } catch (error) {
    console.error("Error fetching weather:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
