const TEXTS_ES = {
  species: 'Especie',
  speciesPlaceHolder: 'Seleccione la especie del animal',
  valueDog: 'Perro',
  valueCat: 'Gato',
  condition: 'Condición',
  conditionPlaceholder: 'Estado del animal',
  valueHealthy: 'Sano',
  valueWounded: 'Herido',
  valueCritical: 'Crítico',
  description: 'Descripción',
  descriptionPlaceholder: 'Es amigable, tiene una herida infectada en una de las patas delanteras...',
  submitButton: '¡Al Rescate!'
};

const TEXTS_EN = {
  species: 'Species',
  speciesPlaceHolder: 'Select the animal species',
  valueDog: 'Dog',
  valueCat: 'Cat',
  condition: 'Condition',
  conditionPlaceholder: 'Animal condition',
  valueHealthy: 'Healthy',
  valueWounded: 'Wounded',
  valueCritical: 'Critical',
  description: 'Description',
  descriptionPlaceholder: 'Friendly, has an infected wound on one of the front paws...',
  submitButton: 'Rescue!'
};

export function getLocalizedText(language: string | undefined = 'ES') {
  if (language !== 'ES') return TEXTS_EN;

  return TEXTS_ES;
};