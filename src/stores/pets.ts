import { create } from 'zustand';
import { PetsState } from '../types';

export const usePetsStore = create<PetsState>((set) => {
  return {
    pets: [
      {
        id: crypto.randomUUID(),
        type: 'dog',
        location: { lat: -33.738186564405446, lng: -61.97131547743373 },
        condition: 'healty',
        description: 'amable',
      },
    ],
  };
});

