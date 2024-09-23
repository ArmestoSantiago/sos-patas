export interface State extends MapType {
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