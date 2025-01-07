import { Instructions } from '../../types/instructionsTypes.d';

export function Instruction1({ handleNextGuide, pageTexts }: Instructions) {
  const texts = pageTexts.instructions1;
  return (
    <div className="instruction1 instruction">
      <p>{texts.header}</p>
      <img src="public/activate-ubication-img.png" alt="activate location image" />
      <p>{texts.description}</p>
      <button onClick={handleNextGuide}>{pageTexts.buttons.next}</button>
    </div>
  );
}