import './LoadingComponent.css';
import { ColorRing } from 'react-loader-spinner';
import { useTextsStore } from '../../stores/texts';
import { usePhraseInterval } from '../../hooks/usePhraseInterval';

export function LoadingComponent() {
  const texts = useTextsStore(state => state.texts.loadingScreenText);
  const loadingPhrases = [texts.text1, texts.text2, texts.text3];

  const curentPhrase = usePhraseInterval({ loadingPhrases, intervalTime: 1000 });

  return (
    <div className='loading-container'>
      <p>{loadingPhrases[curentPhrase]}</p>
      <ColorRing
        width="120"
        height="120"
      />;
    </div>
  );
}