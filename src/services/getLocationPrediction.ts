export async function getLocationPrediction(input: string) {
  // Fetch posibles locations name based on user input
  const API_URL = import.meta.env.VITE_APISOSPATAS_URL;
  return await fetch(`${API_URL}/predictions?input=${input}`)
    .then(res => res.json())
    .then(data => data);
}