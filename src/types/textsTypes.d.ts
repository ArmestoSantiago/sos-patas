export interface TextsState {
  texts: Root;
  setTexts: (lang: ValidLanguages) => void;
}

export enum ValidLanguages {
  EN = 'EN',
  ES = 'ES'
}

export interface Root {
  lang: string;
  instructions: Instructions;
  loadingScreenText: LoadingScreenText;
  menuPanel: MenuPanel;
}

export interface Instructions {
  instructions0: Instructions0;
  instructions1: Instructions0;
  instructions2: Instructions0;
  instructions3: Instructions0;
  buttons: Buttons;
}

export interface Instructions0 {
  header: string;
  description: string;
}

export interface Buttons {
  guest: string;
  next: string;
}

export interface LoadingScreenText {
  text1: string;
  text2: string;
  text3: string;
}

export interface MenuPanel {
  petType: PetType;
  petCondition: PetCondition;
}

export interface PetType {
  dog: string;
  cat: string;
}

export interface PetCondition {
  healthy: string;
  wounded: string;
  critical: string;
}
