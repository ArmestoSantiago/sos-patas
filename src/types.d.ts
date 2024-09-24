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

enum PetsType {
  Dog = 'dog',
  Cat = 'cat'
}

enum PetsCondition {
  Healty = 'Healty',
  Wounded = 'Wounded',
  Critical = 'Critical'
}