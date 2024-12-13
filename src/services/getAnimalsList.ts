export async function getAnimalsList() {
  // Fetch AnimalList from SOSPatas DB
  const API_URL = import.meta.env.VITE_APISOSPATAS_URL;
  return await fetch(`${API_URL}/animals`)
    .then(res => res.json())
    .then(data => data);
}