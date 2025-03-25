import './FirstTimeInstructions.css';
import { useState } from 'react';
import { Instruction0 } from './Instruction0';
import { Instruction1 } from './Instruction1';
import { Instruction2 } from './Instruction2';
import { Instruction3 } from './Instruction3';
import { useTextsStore } from '@stores/texts';

export function FirstTimeInstruction() {
  const [actualGuideIndex, setActualGuideIndex] = useState<number>(0);
  const texts = useTextsStore(state => state.texts);
  const pageTexts = texts.instructions;

  const handleNextGuide = () => {
    if (actualGuideIndex === 3) {
      setActualGuideIndex(-1);
      return window.localStorage.setItem('first', JSON.stringify(true));
    }

    setActualGuideIndex(prevState => prevState + 1);
  };

  if (actualGuideIndex === -1) return null;

  return (
    <div className='instructions-container-list'>
      <div className='instructions-list'>
        {actualGuideIndex === 0 && <Instruction0 handleNextGuide={handleNextGuide} pageTexts={pageTexts} />}
        {actualGuideIndex === 1 && <Instruction1 handleNextGuide={handleNextGuide} pageTexts={pageTexts} />}
        {actualGuideIndex === 2 && <Instruction2 handleNextGuide={handleNextGuide} pageTexts={pageTexts} />}
        {actualGuideIndex === 3 && <Instruction3 handleNextGuide={handleNextGuide} pageTexts={pageTexts} />}
      </div>
    </div>
  );
}