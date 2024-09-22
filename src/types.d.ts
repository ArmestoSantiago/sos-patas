export interface State extends MapType {
  newLocation: () => void;
  reset: () => void;
}

export interface MapType {
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}