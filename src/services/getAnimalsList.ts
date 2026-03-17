import { API_URL } from '@/config';
import { PetsCondition, PetsSituation, PetsType } from '@/types/petsTypes.d';

export const getAnimalsList = async () => {
  // Fetch AnimalList from SOSPatas DB

  return await fetch(`${API_URL}/animals`)
    .then(res => res.json())
    .then(data => {
      const mappedData = data.map((pet: fetchedPets) => {
        return {
          ...pet,
          name: pet.animal_name ?? 'Nombre sin declarar'
        };
      });
      return mappedData;
    });
};

interface fetchedPets {
  id?: string;
  type: PetsType;
  lat: number;
  lng: number;
  condition: PetsCondition;
  description: string;
  imgSrc?: string;
  address: string;
  user_id: string;
  animal_name: string;
  situation: PetsSituation;
}