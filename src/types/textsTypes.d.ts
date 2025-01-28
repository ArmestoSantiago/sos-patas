export interface TextsState {
  texts: Root;
  setLanguage: (lang: ValidLanguages) => void;
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
  googleButtons: GoogleButtons;
  addAnimalsForm: AddAnimalsForm;

}

export interface AddAnimalsForm {
  type: string;
  primaryMessage: string;
  petType: PetType;
  petCondition: PetCondition;
  pageTexts: pageTexts;
}

export interface pageTexts {
  upload: string;
  done: string;
  textareaPlaceholder: string;
  conditionSpanText: string;
  typeSpanText: string;
  descriptionSpanText: string;
  photoSpanText: string;
}

export interface GoogleButtons {
  login: string;
  logout: string;
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
  result: string;
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
