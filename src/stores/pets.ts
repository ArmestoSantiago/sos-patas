import { create } from 'zustand';
import { PetsStateStore } from '@/types/petsTypes.d';
import { getAnimalsList } from '@services/getAnimalsList';

export const usePetsStore = create<PetsStateStore>((set) => {
  return {
    loadingPets: false,
    pets: [],
    fetchPets: async () => {
      set({ loadingPets: true });
      const pets = await getAnimalsList();
      set({ pets });
      set({ loadingPets: false });
    },
  };
});

// Example of Pet:
// pets: [
//   {
//     id: crypto.randomUUID(),
//     type: 'DOG',
//     lat: -33.737777768541996,
//     lng: -61.95909062957763,
//     condition: 'HEALTHY',
//     description: 'amable',
//     address: 'Jujuy 220',
//     name: 'Max',
//     situation: 'TRANSITION',
//     imgSrc: 'https://res.cloudinary.com/dfj9eimlv/image/upload/v1744156350/blob_o7l6wd.jpg',
//     user_id: id
//   },
// ],