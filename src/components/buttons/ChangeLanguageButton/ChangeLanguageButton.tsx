import { useTextsStore } from '../../../stores/texts';
import { ValidLanguages } from '../../../types/textsTypes.d';
import './ChangeLanguageButton.css';

export function ChangeLanguageButton() {
  const textsLang = useTextsStore(state => state.texts.lang);
  const setTexts = useTextsStore(state => state.setTexts);

  const handleToggleLanguage = () => {
    if (textsLang === ValidLanguages.ES) {
      console.log('Porno');
      setTexts(ValidLanguages.EN);
    };
    if (textsLang === ValidLanguages.EN) {
      console.log('Porn');
      setTexts(ValidLanguages.ES);
    };
  };

  return (
    <div className="switch">
      <input onChange={handleToggleLanguage} id="language-toggle" className="check-toggle check-toggle-round-flat" type="checkbox" />
      <label htmlFor="language-toggle"></label>
      <span id="ES" className={textsLang === 'ES' ? 'on' : 'off'}>ES</span>
      <span id="EN" className={textsLang === 'EN' ? 'on' : 'off'}>EN</span>
    </div>
  );
}