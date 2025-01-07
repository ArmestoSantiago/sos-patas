import { Instructions } from './textsTypes';

export interface Instructions {
  handleNextGuide: () => void;
  pageTexts: Instructions;
}