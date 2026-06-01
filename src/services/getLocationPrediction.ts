import { API_URL } from '@/config';

export const getLocationPrediction: (input: string) => Promise<GooglePlacePrediction[]> | false = async (input: string) => {
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

export interface GooglePlacePrediction {
  description: string;
  matched_substrings: GoogleMatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: GoogleStructuredFormatting;
  terms: GoogleTerm[];
  types: string[];
}

export interface GoogleMatchedSubstring {
  length: number;
  offset: number;
}

export interface GoogleStructuredFormatting {
  main_text: string;
  main_text_matched_substrings: GoogleMatchedSubstring[];
  secondary_text?: string;
}

export interface GoogleTerm {
  offset: number;
  value: string;
}