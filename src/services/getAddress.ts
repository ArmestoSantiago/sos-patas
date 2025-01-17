import { GOOGLE_GEOCODE_APIKEY, GOOGLE_GEOCODE_URL } from '../config';
import { Location } from '../types/locationTypes';

export const getAddress = async ({ lat, lng }: Location) => {
  // Transfor from coords to address name

  const GEOCODE_URL = `${GOOGLE_GEOCODE_URL}/json?latlng=${lat},${lng}&key=${GOOGLE_GEOCODE_APIKEY}`;
  return fetch(GEOCODE_URL)
    .then(res => res.json())
    .then(addressInfo => addressInfo);
};