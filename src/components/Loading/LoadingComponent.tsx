import { ColorRing } from 'react-loader-spinner';
import './LoadingComponent.css';
import { useEffect, useState } from 'react';

export function LoadingComponent() {
  const loadingPhrases = ['Estamos preparando todo para que las mascotas tengan un hogar', 'Esto puede tardar unos momentos', 'Gracias por usar SOSPatas'];
  const [curentPhrase, setCurrentPhrase] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (curentPhrase === loadingPhrases.length - 1) {
        setCurrentPhrase(0);
        return;
      }
      setCurrentPhrase(prevState => prevState + 1);
    }, 3000);

    return () => clearInterval(interval);
  });

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