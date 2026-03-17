const toRadians = (distance: number) => {
  return distance * (Math.PI / 180);
};
export const getDistance = (petLat: number, petLng: number, userLocation: { lat: number; lng: number; }) => {
  const { lat: userLat, lng: userLng } = userLocation;
  // Calculate the distance between two points using the Haversine formula
  const radius = 6371; // Radius of the Earth in kilometers
  const latDiff = toRadians(petLat - userLat);
  const lngDiff = toRadians(petLng - userLng);

  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(toRadians(userLat)) *
    Math.cos(toRadians(petLat)) *
    Math.sin(lngDiff / 2) *
    Math.sin(lngDiff / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = radius * c;

  return distance;
};