import { GOOGLE_GEOCODE_APIKEY } from '../config';
import { General } from '../types/geocodeTypes.d';

export async function getGeocode(location: string) {
  // Transfor from location name to location coords to change the map position
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_GEOCODE_APIKEY}`)
    .then(res => res.json())
    .then((data: General) => data.results[0].geometry.location);
}