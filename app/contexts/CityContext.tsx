"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { City } from "@/app/types";

interface CityContextType {
  city: City | null;
  setCity: (city: City | null) => void;
  pref: string;
  setPref: (pref: string) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export function CityProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<City | null>(null);
  const [pref, setPref] = useState<string>("");

  return (
    <CityContext.Provider value={{ city, setCity, pref, setPref }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCityContext() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCityContext must be used within CityProvider");
  }
  return context;
}
