//                                           Location Types
export interface LocationState extends MapType {
  draggable: boolean;
  newLocation: (lat: number, lng: numner) => void;
  reset: () => void;
  setDraggable: () => void;
}

export interface MapType {
  location: Location;
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
  Dog = 'dog',
  Cat = 'cat'
}

export enum PetsCondition {
  Healty = 'healty',
  Wounded = 'wounded',
  Critical = 'critical'
}

interface FormInformation {
  especie: PetsType;
  condition: PetsCondition;
  description: string;
}