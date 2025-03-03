import { useEffect, useState } from 'react';

export function usePhraseInterval({ loadingPhrases, intervalTime }: UsePhraseIntervalProps) {
  const [curentPhrase, setCurrentPhrase] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (curentPhrase === loadingPhrases.length - 1) {
        setCurrentPhrase(0);
        return;
      }
      setCurrentPhrase(prevState => prevState + 1);
    }, intervalTime);

    return () => clearInterval(interval);
  });

  return curentPhrase;
}

interface UsePhraseIntervalProps {
  loadingPhrases: string[],
  intervalTime: number;
}