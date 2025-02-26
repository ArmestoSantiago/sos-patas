import { PetsCondition, PetsType } from '@/types/petsTypes.d';

interface FormElements extends HTMLFormControlsCollection {
  petType: HTMLInputElement;
  petCondition: HTMLInputElement;
  petDescription: HTMLInputElement;
  petImg: HTMLInputElement;
}

export const mapData = (data: React.FormEvent<HTMLFormElement>) => {
  const elements = data.currentTarget.elements as FormElements;
  const type = elements.petType.value === PetsType.DOG ? PetsType.DOG : PetsType.CAT;
  const condition = elements.petCondition.value === PetsCondition.HEALTHY ? PetsCondition.HEALTHY : elements.petCondition.value === PetsCondition.WOUNDED ? PetsCondition.WOUNDED : PetsCondition.CRTICIAL;
  const mappedData = {
    type,
    condition,
    description: elements.petDescription.value,
    imgSrc: 'https://imgs.search.brave.com/kClCpuOhhu73I7w2G2D105QjJh5wmsMQTD3POuaSB8Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vc2xpZGVz/Lzg4YjE5Mzk0YzA0/NjRjNDU4ZWQ0Yzll/ODdmZGMyY2U5Lndl/YnA'
  };

  return mappedData;
};