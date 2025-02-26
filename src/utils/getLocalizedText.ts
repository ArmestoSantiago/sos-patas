import { ValidLanguages } from '../types/textsTypes.d';
import TEXT_ES from '@/assets/texts/TEXTS_ES.json';
import TEXT_EN from '@/assets/texts/TEXTS_EN.json';

export const getLocalizedText = (lang: ValidLanguages | '') => {
  // Return text pages based on the language preference of the user
  if (lang === '') {
    const userLang = navigator.language;
    const userLangSplitted = userLang.split('-')[1];
    if (userLangSplitted === ValidLanguages.ES) return TEXT_ES;
  }

  // Change page language on the user selection
  if (lang === ValidLanguages.ES) return TEXT_ES;
  if (lang === ValidLanguages.EN) return TEXT_EN;

  return TEXT_EN;
};