//                                             Pet Types
export interface PetsState {
  pets: PetsInformation[];
}

export interface PetsInformation {
  id: string;
  type: PetsType;
  lat: number;
  lng: number;
  condition: PetsCondition;
  description: string;
  imgSrc?: string;
  address: string;
}

export enum PetsType {
  DOG = 'DOG',
  CAT = 'CAT'
}

export enum PetsCondition {
  HEALTHY = 'HEALTHY',
  WOUNDED = 'WOUNDED',
  CRTICIAL = 'CRTICIAL'
}

interface FormInformation {
  especie: PetsType;
  condition: PetsCondition;
  description: string;
}
