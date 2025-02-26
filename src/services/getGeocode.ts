import { GOOGLE_GEOCODE_APIKEY, GOOGLE_GEOCODE_URL } from '@/config';
import { General } from '@/types/geocodeTypes.d';

export const getGeocode = async (location: string) => {
  // Transfor from location name to location coords to change the map position
  const GEOCODE_URL = `${GOOGLE_GEOCODE_URL}/json?address=${location}&key=${GOOGLE_GEOCODE_APIKEY}`;
  return fetch(GEOCODE_URL)
    .then(res => res.json())
    .then((data: General) => data.results[0].geometry.location);
};