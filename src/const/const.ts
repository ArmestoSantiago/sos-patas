import { GOOGLE_MAPS_ID } from '../config';

export const CONST = {
  defaultLocation: { lat: -33.860664, lng: 151.208138 }  // default map position 
};

export const MAP_CONFIGURATION = {
  mapId: GOOGLE_MAPS_ID,
  defaultZoom: 15,
  disableDefaultUI: true,
  fullscreenOption: false,
  daggable: true
};