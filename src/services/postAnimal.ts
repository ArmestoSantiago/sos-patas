import { API_URL, SOSPATAS_API_KEY } from '@/config';
import { PetsCondition, PetsInformation, PetsSituation, PetsType } from '@/types/petsTypes.d';
import { User } from '@/types/usersTypes.d';
import { getPostedByUser } from './getPostedByUser';
import { uploadImage } from './uploadImage';

export const postAnimal = async (data: PostAnimalParams) => {
  const { userInfo: user, image, address, description, name, type, situation, condition, lat, lng } = data;

  try {
    const postedByUser: PetsInformation[] = await getPostedByUser(user.id);

    if (postedByUser.length >= 6) {
      throw ({ code: 429, posted: false });
    }

    const imageURL = await uploadImage(image);

    const toPostData = {
      user_id: user.id,
      animal_name: name,
      type,
      situation,
      description,
      condition,
      lat, lng,
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
    console.log(err);
    return {
      posted: false,
      code: error.code
    };
  };
};

interface PostAnimalParams {
  userInfo: User;
  address: string,
  description: string,
  name: string;
  type: PetsType;
  situation: PetsSituation;
  image: File;
  condition: PetsCondition,
  lat: number,
  lng: number;
};

