import { useTextsStore } from '@stores/texts';
import { ValidLanguages } from '@/types/textsTypes.d';
import './ChangeLanguageButton.css';

export function ChangeLanguageButton() {
  const textsLang = useTextsStore(state => state.texts.lang);
  const setLanguage = useTextsStore(state => state.setLanguage);

  const handleToggleLanguage = () => {
    if (textsLang === ValidLanguages.ES) {
      setLanguage(ValidLanguages.EN);
    };
    if (textsLang === ValidLanguages.EN) {
      setLanguage(ValidLanguages.ES);
    };
  };

  return (
    <div className='button-container'>
      <div onClick={handleToggleLanguage} className="flex-cradle">
        <div className={`slider-cradle ${textsLang === ValidLanguages.ES && 'is-transitioned'}`}>
          <div className="option-2">ES</div>
          <div className="option-1">EN</div>
          <div className="handle"></div>
        </div>
      </div>
    </div>
  );
}