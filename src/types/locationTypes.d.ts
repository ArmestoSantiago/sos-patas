//                                           Location Types
export interface LocationState extends MapType {
  toAddAnimal: boolean | undefined;
  newAnimalLocation: Location | null;
  setNewAnimalLocation: (lat?, lng?) => void;
  setToAddAnimal: (type: boolean) => void;
  newLocation: (lat: number, lng: number) => void;
  resetLocation: (lat: number, lng: number) => void;
  fetchLocation: () => void;
}

export interface MapType {
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}

