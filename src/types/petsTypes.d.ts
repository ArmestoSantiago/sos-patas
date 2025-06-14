//                                             Pet Types
export interface PetsStateStore {
  loadingPets: boolean;
  pets: PetsInformation[];
  fetchPets: () => void;
}

export interface PetsState {
  pets: PetsInformation[];
}

export interface PetsPostData {
  condition: PetsCondition;
  type: PetsType;
  description: string;
  lat: number,
  lng: number;
}

export interface PetsInformation {
  id?: string;
  type: PetsType;
  lat: number;
  lng: number;
  condition: PetsCondition;
  description: string;
  imgSrc?: string;
  address: string;
  user_id: string;
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
  petType: PetsType;
  petCondition: PetsCondition;
  petDescription: string;
  petImg: File;
}
