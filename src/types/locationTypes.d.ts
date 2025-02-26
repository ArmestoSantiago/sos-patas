//                                           Location Types
export interface LocationState extends MapType {
  draggable: boolean;
  toAddAnimal: boolean | undefined;
  openForm: boolean;
  locationNewAnimal: Location | undefined;
  setOpenForm: () => void;
  setLocationNewAnimal: (lat, lng) => void;
  setToAddAnimal: (type: boolean) => void;
  newLocation: (lat: number, lng: numner) => void;
  resetLocation: () => void;
  setDraggable: () => void;
}

export interface MapType {
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}

