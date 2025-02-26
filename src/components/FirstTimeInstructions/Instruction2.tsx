import { AddIcon } from '@icons/PageIcons';
import { Instructions } from '@/types/instructionsTypes.d';

export function Instruction2({ handleNextGuide, pageTexts }: Instructions) {
  const texts = pageTexts.instructions2;
  return (
    <div className="instruction2 instruction">
      <div className='add-btn-img'><AddIcon /></div>
      <p>{texts.description}</p>
      <button onClick={handleNextGuide}>{pageTexts.buttons.next}</button>
    </div>
  );
};