import { create } from 'zustand';
import { MapType, State } from '../types.d';
import { getLocation } from '../services/getLocation';

const initialState: MapType = {
  location: await getLocation().then((location) => location),
};

export const useLocationStore = create<State>((set) => {
  return {
    ...initialState,
    newLocation: () => set({ location: { lat: -37, lng: 46 } }),
    reset: () => set(initialState)
  };
});