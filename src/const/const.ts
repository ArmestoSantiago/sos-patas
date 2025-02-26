import { GOOGLE_MAPS_ID } from '@/config';

export const CONST = {
  defaultLocation: { lat: -33.860664, lng: 151.208138 }  // default map position 
};

export const MAP_CONFIGURATION: google.maps.MapOptions = {
  mapId: GOOGLE_MAPS_ID,
  zoom: 15,
  disableDefaultUI: true,
  // fullscreenControlOptions: false,
  draggable: true,
  clickableIcons: false,
};

const petsPostedLocalValue = window.localStorage.getItem('animalList');
export const petsPostedLocal = petsPostedLocalValue ? JSON.parse(petsPostedLocalValue) : [];