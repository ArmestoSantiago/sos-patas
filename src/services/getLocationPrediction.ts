import { API_URL } from '@/config';

export const getLocationPrediction = async (input: string) => {
  // Fetch posibles locations name based on user input

  const fullURL = `${API_URL}/predictions?input=${input}`;
  try {
    const res = await fetch(fullURL);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data.predictions;

  } catch (err) {
    return false;
  }

};