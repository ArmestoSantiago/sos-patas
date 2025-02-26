import { API_URL, SOSPATAS_API_KEY } from '@/config';
import { PetsInformation, PetsPostData } from '@/types/petsTypes';
import { User } from '@/types/usersTypes.d';
import { getAddress } from './getAddress';
import { petsPostedLocal } from '@/const/const';
interface PostAnimalParams {
  data: PetsPostData;
  user: null | User;
}
export const postAnimal = async ({ data, user }: PostAnimalParams) => {
  const address: string = await getAddress({ lat: data.lat, lng: data.lng });

  if (!user) {
    const toPostData: PetsInformation = {
      user_id: 'guest',
      id: crypto.randomUUID(),
      ...data,
      address
    };

    const toPostDataGuest = petsPostedLocal.concat(toPostData);
    window.localStorage.setItem('animalList', JSON.stringify(toPostDataGuest));
    return { posted: true };
  }

  try {
    const toPostData: PetsInformation = {
      ...data,
      user_id: user.id,
      address
    };

    const response = await fetch(`${API_URL}/animals`, {
      method: 'POST',
      body: JSON.stringify(toPostData),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': SOSPATAS_API_KEY
      }
    });

    if (!response.ok) {
      if (response.status === 429) throw { code: response.status };
    }
    return { posted: true };

  } catch (err) {
    const error = err as { code?: number; };
    return {
      posted: false,
      code: error.code
    };
  }

};