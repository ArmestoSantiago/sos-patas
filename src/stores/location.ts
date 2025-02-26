import { create } from 'zustand';
import { LocationState, MapType } from '@/types/locationTypes.d';
import { getLocation } from '@services/getLocation';

const initialState: MapType = {
  location: await getLocation().then((location) => location),
};

export const useLocationStore = create<LocationState>((set, get) => {
  return {
    ...initialState,
    draggable: false,
    toAddAnimal: false,
    locationNewAnimal: undefined,
    openForm: false,
    setOpenForm: () => {
      const openModal = get().openForm;
      set({ openForm: !openModal });
    },
    setLocationNewAnimal: (lat: number, lng: number) => {
      set({ locationNewAnimal: { lat: lat, lng: lng } });
    },
    setToAddAnimal: (type) => {
      set({ toAddAnimal: type });
    },
    newLocation: (lat: number, lng: number) => set({ location: { lat: lat, lng: lng } }),
    setDraggable: () => {
      const isDraggable = get().draggable;
      if (isDraggable) set({ draggable: false });
      if (!isDraggable) set({ draggable: true });
    },

    resetLocation: () => set(initialState)
  };
});