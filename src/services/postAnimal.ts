import { API_URL, SOSPATAS_API_KEY } from '@/config';
import { PetsInformation, PetsPostData, PetsType } from '@/types/petsTypes.d';
import { User } from '@/types/usersTypes.d';
import { getAddress } from './getAddress';
import { petsPostedLocal } from '@/const/const';
import { getPostedByUser } from './getPostedByUser';
import { uploadImage } from './uploadImage';

const dogExample = './dog-example.jpg';
const catExample = './cat-example.jpg';

export const postAnimal = async ({ data, user, image }: PostAnimalParams) => {

  const address: string = await getAddress({ lat: data.lat, lng: data.lng });

  if (!user) {
    const toPostData: PetsInformation = {
      user_id: 'guest',
      id: crypto.randomUUID(),
      ...data,
      address,
      imgSrc: data.type === PetsType.DOG ? dogExample : catExample
    };

    const toPostDataGuest = petsPostedLocal.concat(toPostData);
    window.localStorage.setItem('animalList', JSON.stringify(toPostDataGuest));
    return { posted: true };
  }

  try {
    const postedByUser: PetsInformation[] = await getPostedByUser(user.id);

    if (postedByUser.length >= 3) {
      throw ({ code: 429, posted: false });
    }

    const blob = new Blob([image]);
    const imageURL = await uploadImage(blob);

    const toPostData: PetsInformation = {
      ...data,
      user_id: user.id,
      address,
      imgSrc: imageURL
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
interface PostAnimalParams {
  data: PetsPostData;
  user: null | User;
  image: File;
}