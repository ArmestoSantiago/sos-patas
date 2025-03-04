import { create } from 'zustand';
import { LocationState, MapType } from '@/types/locationTypes.d';
import { getLocation } from '@services/getLocation';
import { CONST } from '@/const/const';

const initialState: MapType = {
  location: await getLocation().then((location) => location),
};

export const useLocationStore = create<LocationState>((set, get) => {
  return {
    location: CONST.defaultLocation,
    draggable: false,
    toAddAnimal: false,
    locationNewAnimal: undefined,
    openForm: false,
    fetchLocation: async () => {
      const location = await getLocation().then((location) => location);
      set({ location });
    },
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