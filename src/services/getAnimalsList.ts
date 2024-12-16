import { API_URL } from '../config';

export async function getAnimalsList() {
  // Fetch AnimalList from SOSPatas DB

  return await fetch(`${API_URL}/animals`)
    .then(res => res.json())
    .then(data => data);
}