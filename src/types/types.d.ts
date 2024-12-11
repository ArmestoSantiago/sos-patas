//                                           Location Types
export interface LocationState extends MapType {
  draggable: boolean;
  newLocation: (lat: number, lng: numner) => void;
  resetLocation: () => void;
  setDraggable: () => void;
}

export interface MapType {
  location: Location;
  setLoading: (boolean) => void;
}

export interface Location {
  lat: number;
  lng: number;
}

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

