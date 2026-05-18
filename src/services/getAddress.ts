import { GOOGLE_GEOCODE_APIKEY, GOOGLE_GEOCODE_URL } from '@/config';
import { Location } from '@/types/locationTypes';

export const getAddress = async ({ lat, lng }: Location) => {
  // Transfor from coords to address name

  const GEOCODE_URL = `${GOOGLE_GEOCODE_URL}/json?latlng=${lat},${lng}&key=${GOOGLE_GEOCODE_APIKEY}`;

  try {
    const res = await fetch(GEOCODE_URL);
    if (!res.ok) throw Error();
    const addressInfo = await res.json();
    const firstResult = addressInfo.results?.[0];
    if (!firstResult) throw Error();
    const formateAddress = firstResult?.formatted_address.split(',')[0]; 1;
    return formateAddress;
  } catch (err) {
    return null;
  }

};

