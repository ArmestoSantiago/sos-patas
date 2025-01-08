import { useTextsStore } from '../../../stores/texts';
import { ValidLanguages } from '../../../types/textsTypes.d';
import './ChangeLanguageButton.css';

export function ChangeLanguageButton() {
  const textsLang = useTextsStore(state => state.texts.lang);
  const setTexts = useTextsStore(state => state.setTexts);

  const handleToggleLanguage = () => {
    if (textsLang === ValidLanguages.ES) {
      setTexts(ValidLanguages.EN);
    };
    if (textsLang === ValidLanguages.EN) {
      setTexts(ValidLanguages.ES);
    };
  };

  return (
    <div className="flex-cradle">
      <div className="slider-cradle">
        <div className="option-1">EN</div>
        <div className="option-2">ES</div>
        <div className="handle"></div>
      </div>
    </div>
  );
}