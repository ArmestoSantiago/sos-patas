import { CONST } from '@/const/const';

export const getLocation = async () => {
  let position;

  const getPosition = (): Promise<GeolocationPosition> =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

  try { // Try to get the user position to set as the center of the map, if the user allow it
    const userPosition = await getPosition();
    const coords = {
      lat: userPosition.coords.latitude,
      lng: userPosition.coords.longitude
    };
    position = coords;
  } catch (error) { // if not map will be rendered at the default position
    position = CONST.defaultLocation;
  }
  return position;

};