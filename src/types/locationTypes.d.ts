//                                           Location Types
export interface LocationState extends MapType {
  draggable: boolean;
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

