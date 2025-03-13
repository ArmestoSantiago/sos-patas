import { GOOGLE_MAPS_ID } from '@/config';
import { Location } from '@/types/locationTypes.d';

export const CONST: CONST = {
  defaultLocation: { lat: -33.75, lng: -61.966 }  // default map position 
};

export const MAP_CONFIGURATION = {
  mapId: GOOGLE_MAPS_ID,
  zoom: 15,
  disableDefaultUI: true,
  draggable: true,
  clickableIcons: false,
};

const petsPostedLocalValue = window.localStorage.getItem('animalList');
export const petsPostedLocal = petsPostedLocalValue ? JSON.parse(petsPostedLocalValue) : [];

interface CONST {
  defaultLocation: Location;
}