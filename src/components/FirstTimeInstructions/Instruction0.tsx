import { Instructions } from '../../types/instructionsTypes.d';

export function Instruction0({ handleNextGuide, pageTexts }: Instructions) {
  const texts = pageTexts.instructions0;
  return (
    <div className="instruction0 instruction">
      <h3>{texts.header}</h3>
      <p>{texts.description}</p>
      <button onClick={handleNextGuide}>{pageTexts.buttons.next}</button>
    </div>
  );
}