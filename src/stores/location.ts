import { create } from 'zustand';
import { LocationState } from '@/types/locationTypes.d';
import { getLocation } from '@services/getLocation';
import { CONST } from '@/const/const';

export const useLocationStore = create<LocationState>((set) => {
  return {
    location: CONST.defaultLocation,
    initialLocation: {},
    toAddAnimal: false,
    newAnimalLocation: null,
    fetchLocation: async () => {
      const location = await getLocation().then((location) => location);
      set({ location });
    },
    setNewAnimalLocation: (lat: number, lng: number) => {
      if (lat === null || lng === null) return set({ newAnimalLocation: null });
      set({ newAnimalLocation: { lat, lng } });
    },
    setToAddAnimal: (type) => {
      set({ toAddAnimal: type });
    },
    newLocation: (lat: number, lng: number) => set({ location: { lat, lng } }),
    resetLocation: (lat: number, lng: number) => set({ location: { lat, lng } })
  };
});