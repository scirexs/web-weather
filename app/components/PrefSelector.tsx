import type { City } from "@/app/types";
import { useCallback, useMemo, useId } from "react";
import { useCityContext } from "@/contexts/CityContext";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PrefSelectorProps {
  cities: City[];
}

export default function PrefSelector({ cities }: PrefSelectorProps) {
  const { setCity, setPref } = useCityContext();
  const id = useId();

  const prefs = useMemo(() => [...new Set(cities.map((x) => x.pref))], [cities]);
  const handleSelectChange = useCallback((value: string) => {
    setPref(value);
    setCity(null);
  }, [setCity, setPref]);

  return (
    <div>
      <Label htmlFor={id} className="block font-medium mb-3">都道府県</Label>
      <Select
        onValueChange={(value) => handleSelectChange(value)}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder="都道府県" />
        </SelectTrigger>
        <SelectContent>
          {prefs.map((pref) => (
            <SelectItem key={pref} value={pref}>{pref}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
