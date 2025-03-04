import { create } from 'zustand';
import { PetsStateStore } from '@/types/petsTypes.d';
import { getAnimalsList } from '@services/getAnimalsList';

export const usePetsStore = create<PetsStateStore>((set) => {
  return {
    pets: [], // Estado inicial vacío
    fetchPets: async () => {
      const pets = await getAnimalsList();
      set({ pets });
    },
  };
});

// Example of Pets:
// pets: [
//   {
//     id: crypto.randomUUID(),
//     type: 'dog',
//     location: { lat: -33.738186564405446, lng: -61.97131547743373 },
//     condition: 'healty',
//     description: 'amable',
//   },
// ],