import { useCities } from "@/hooks/useCities";
import PrefSelector from "@/components/PrefSelector";
import CitySelector from "@/components/CitySelector";

export default function LocationSelector() {
  const { cities, loading, error } = useCities();

  return (
    <div className="rounded-lg border bg-card shadow-md p-6 mb-6">
      {loading && (
        <div className="text-center text-muted-foreground">都市データを読み込み中...</div>
      )}
      {error && (
        <div className="text-destructive text-center">都市データ読込エラー: {error}</div>
      )}
      {!loading && !error && (
        <>
          <h2 className="text-lg font-medium mb-3">場所を選択してください</h2>
          <div className="flex gap-4">
            <PrefSelector cities={cities} />
            <CitySelector cities={cities} />
          </div>
        </>
      )}
    </div>
  );
}
