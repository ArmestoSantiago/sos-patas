export function getLocationPrediction(input: string) {
  const GOOGLE_MAPS_APIKEY = import.meta.env.VITE_GOOGLE_MAPS_APIKEY;
  fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&key=${GOOGLE_MAPS_APIKEY}`)
    .then(res => console.log(res));
}