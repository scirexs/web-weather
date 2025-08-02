"use client";

import LocationSelector from "@/components/LocationSelector";
import WeatherDisplay from "@/components/WeatherDisplay";
import { CityProvider } from "@/contexts/CityContext";

export default function Home() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          今の天気アプリ
        </h1>

        <CityProvider>
          <LocationSelector />
          <WeatherDisplay />
        </CityProvider>
      </div>
    </div>
  );
}
