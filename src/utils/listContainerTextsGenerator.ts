import { PetsCondition, PetsInformation, PetsType } from '../types/petsTypes.d';
import { MenuPanel } from '../types/textsTypes.d';

export const listContainerTextsGenerator = (pet: PetsInformation, texts: MenuPanel) => {
  const petTypeText = pet.type === PetsType.DOG ? texts.petType.dog : texts.petType.cat;
  const petTypeIcon = pet.type === PetsType.DOG ? '🐶' : '🐱';
  const petConditionText = pet.condition === PetsCondition.HEALTHY ? texts.petCondition.healthy : pet.condition === PetsCondition.WOUNDED ? texts.petCondition.wounded : texts.petCondition.critical;
  const petConditionIcon = pet.condition === PetsCondition.HEALTHY ? '💚' : pet.condition === PetsCondition.WOUNDED ? '🟠' : '🩸';
  const petDescriptionIcon = '📖';

  return {
    petTypeText,
    petTypeIcon,
    petConditionText,
    petConditionIcon,
    petDescriptionIcon
  };
};
