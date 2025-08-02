import type { City } from "@/app/types";
import { useCallback, useMemo, useId } from "react";
import { useCityContext } from "@/contexts/CityContext";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CitySelectorProps {
  cities: City[];
}

export default function CitySelector({ cities }: CitySelectorProps) {
  const { city, setCity, pref } = useCityContext();
  const id = useId();

  const byPref = useMemo(() => groupByPref(cities), [cities]);
  const handleSelectChange = useCallback((cityId: string) => {
    if (cityId === "") {
      setCity(null);
      return;
    }
    const city = cities.find(c => c.id === cityId);
    if (!city) return;
    setCity(city);
  }, [cities, setCity]);

  if (!pref) return null;

  return (
    <div className="w-full">
      <Label htmlFor={id} className="block font-medium mb-3">市区町村</Label>
      <Select
        onValueChange={(value) => handleSelectChange(value)}
        value={city?.id ?? ""}
      >
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder="市区町村" />
        </SelectTrigger>
        <SelectContent>
          {byPref.get(pref)?.map((x) => (
            <SelectItem key={x.id} value={x.id}>{x.city}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function groupByPref(cities: City[]): Map<string, City[]> {
  const result = new Map<string, City[]>();
  cities.forEach((x) => {
    if (result.has(x.pref)) {
      result.get(x.pref)?.push(x);
    } else {
      result.set(x.pref, [x]);
    }
  });
  return result;
}
