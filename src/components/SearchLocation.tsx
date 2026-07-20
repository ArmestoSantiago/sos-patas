import { getLocationPrediction, GooglePlacePrediction } from '@/services/getLocationPrediction';
import { useLocationStore } from '@/stores/location';
import { CrossIcon, LocationIcon, SearchIcon } from './Icons';
import { useEffect, useRef, useState } from 'react';
import { getGeocode } from '@/services/getGeocode';

interface SearchLocationProps {
  className?: string;
}

export function SearchLocation({ className = 'group absolute left-1/2 top-24 z-20 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2' }: SearchLocationProps) {
  const [value, setValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>('');
  const [predictions, setPredictions] = useState<GooglePlacePrediction[]>([]);
  const { newLocation } = useLocationStore();
  const formattedPredictions = predictions.slice(0, 3);
  const [loading, setLoading] = useState<boolean>(false);
  const latestValue = useRef(value);

  useEffect(() => {
    latestValue.current = value;
    setLoading(value.trim().length > 0);

    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  const handleNewLocation = async (prediction: string) => {
    const coords = await getGeocode(prediction);
    newLocation(coords.lat, coords.lng);
    setValue('');
  };

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setPredictions([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const getPredictions = async () => {
      const predictions = await getLocationPrediction(debouncedValue) || [];
      if (!cancelled && latestValue.current === debouncedValue) {
        setPredictions(predictions);
        setLoading(false);
      }
    };

    getPredictions();

    return () => {
      cancelled = true;
    };
  }, [debouncedValue]);

  const handleClear = () => {
    setValue('');
  };

  return (
    <div className={className}>
      <div className="flex h-12 items-center gap-2 rounded-full bg-white px-4 shadow-lg ring-1 ring-black/10 transition-shadow focus-within:shadow-xl">
        <button
          type="button"
          aria-label="Buscar ubicacion"
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-main"
        >
          <SearchIcon />
        </button>

        <input
          type="text"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Buscar en el mapa"
          className="peer min-w-0 flex-1 bg-transparent text-base text-stone-800 outline-none placeholder:text-stone-400"
        />

        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpiar busqueda"
          className="hidden size-8 shrink-0 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-700 group-has-[input:valid]:flex"
        >
          <CrossIcon />
        </button>
      </div>

      <div className="mt-2 hidden overflow-hidden rounded-2xl bg-white py-2 text-left shadow-lg ring-1 ring-black/10 group-has-[input:valid]:block">
        {loading ? (
          <p className="px-4 py-3 text-sm text-stone-500">Cargando...</p>
        ) : (
          formattedPredictions.map((prediction) => (
            <button
              onClick={() => { handleNewLocation(prediction.description); }}
              key={prediction.description}
              type="button"
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-stone-700 transition-colors hover:bg-stone-100"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-500">
                <LocationIcon size={18} />
              </span>
              <span className="min-w-0 flex-1 truncate">{prediction.description}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
