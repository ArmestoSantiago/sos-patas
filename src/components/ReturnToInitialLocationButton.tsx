import { useLocationStore } from '@/stores/location';
import { CONST } from '@/const/const';
export function ReturnToInitialLocationButton() {
  const { resetLocation, userDefaultLocation } = useLocationStore();
  const handleResetLocation = () => {
    resetLocation(userDefaultLocation?.lat || CONST.defaultLocation.lat, userDefaultLocation?.lng || CONST.defaultLocation.lng);
  };
  return (
    <div className="group relative shrink-0">
      <button
        onClick={handleResetLocation}
        type="button"
        aria-label="Regresar a la ubicación inicial"
        aria-describedby="return-to-initial-location-tooltip"
        className="flex size-12 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 shadow-lg transition-all hover:scale-105 cursor-pointer hover:border-stone-300 hover:bg-stone-100 hover:text-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-400"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="6" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
      </button>

      <span
        id="return-to-initial-location-tooltip"
        role="tooltip"
        className="pointer-events-none absolute right-0 top-14 whitespace-nowrap rounded-md bg-stone-800 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
      >
        regresar
      </span>
    </div>
  );
}
