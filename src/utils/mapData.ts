import { PetsCondition, PetsType } from '@/types/petsTypes.d';

export const mapData = (data: React.FormEvent<HTMLFormElement>) => {
  const elements = data.currentTarget.elements as FormElements;
  const type = elements.petType.value === PetsType.DOG ? PetsType.DOG : PetsType.CAT;
  const condition = elements.petCondition.value === PetsCondition.HEALTHY ? PetsCondition.HEALTHY : elements.petCondition.value === PetsCondition.WOUNDED ? PetsCondition.WOUNDED : PetsCondition.CRTICIAL;

  const mappedData = {
    type,
    condition,
    description: elements.petDescription.value,
  };

  return mappedData;
};

interface FormElements extends HTMLFormControlsCollection {
  petType: HTMLInputElement;
  petCondition: HTMLInputElement;
  petDescription: HTMLInputElement;
  petImg: HTMLInputElement;
}