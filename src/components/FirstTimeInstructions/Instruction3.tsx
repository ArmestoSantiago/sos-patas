import { Instructions } from '../../types/instructionsTypes.d';
import { GoogleLoginButton } from '../buttons/GoogleLoginButton/GoogleLoginButton';

export function Instruction3({ handleNextGuide, pageTexts }: Instructions) {
  const texts = pageTexts.instructions3;
  return (
    <div className="instruction3 instruction">
      <h3>{texts.header}</h3>
      <p>{texts.description}</p>
      <GoogleLoginButton type={true} extraAction={handleNextGuide} />
      <button onClick={handleNextGuide} type="button">
        {pageTexts.buttons.guest}
      </button>
    </div>
  );
}