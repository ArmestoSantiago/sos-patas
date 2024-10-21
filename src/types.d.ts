export interface LocationState extends MapType {
  draggable: boolean;
  newLocation: (lat: number, lng: numner) => void;
  reset: () => void;
  setDraggable: () => void;
}

export interface PetsState {
  pets: PetsInformation[];
}

export interface MapType {
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface PetsInformation {
  id: string;
  type: PetsType;
  location: Location;
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