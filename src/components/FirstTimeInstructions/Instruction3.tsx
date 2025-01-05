import { GoogleLoginButton } from '../GoogleLoginButton/GoogleLoginButton';

export function Instruction3({ handleNextGuide }: { handleNextGuide: () => void; }) {

  return (
    <div className="instruction3 instruction">
      <h3>Eso es todo!</h3>
      <p>Para continuar elige conectarte con tu cuenta de Google o seguir como invitado. Si continuas como invitado todos los animales que agregues solo podran ser vistos por vos</p>
      <GoogleLoginButton extraAction={handleNextGuide} />
      <button onClick={handleNextGuide} type="button">
        Continuar como invitado
      </button>
    </div>
  );
}