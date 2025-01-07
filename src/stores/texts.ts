import { create } from 'zustand';
import { getLocalizedText } from '../utils/getLocalizedText';
import { TextsState, ValidLanguages } from '../types/textsTypes.d';

const initalState = {
  texts: getLocalizedText('')
};

export const useTextsStore = create<TextsState>(set => {
  return {
    ...initalState,
    setTexts: (lang: ValidLanguages) => {
      const texts = getLocalizedText(lang);
      set({ texts });
    }
  };
});