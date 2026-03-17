import { Location } from '@/types/locationTypes.d';

export const validateData = ({ description, name, img, newAnimalLocation }: validateDataType) => {
  if (img === null) return 'img';
  if (name === '') return 'name';
  if (!newAnimalLocation) return 'location';
  if (description === '') return 'description';

  return false;
};

interface validateDataType {
  description: string,
  name: string,
  img: File | null;
  newAnimalLocation: Location | undefined;
}