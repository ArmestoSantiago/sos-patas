import { create } from 'zustand';
import { LocationState, MapType } from '../types.d';
import { getLocation } from '../services/getLocation';

const initialState: MapType = {
  location: await getLocation().then((location) => location),
};

export const useLocationStore = create<LocationState>((set, get) => {
  return {
    ...initialState,
    draggable: false,
    newLocation: (lat: number, lng: number) => set({ location: { lat: lat, lng: lng } }),
    setDraggable: () => {
      const isDraggable = get().draggable;
      if (isDraggable) set({ draggable: false });
      if (!isDraggable) set({ draggable: true });
    },
    reset: () => set(initialState)
  };
});