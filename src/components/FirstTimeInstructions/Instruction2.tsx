import { AddIcon } from '../../icons/PageIcons';

export function Instruction2({ handleNextGuide }: { handleNextGuide: () => void; }) {
  return (
    <div className="instruction2 instruction">
      <div className='add-btn-img'><AddIcon /></div>
      <p>Para añadir algun animalito que perdido o que creas que necesita ayuda has click en el boton de agregar, selecciona la ubicación de donde lo viste por última vez y completa el formulario</p>
      <button onClick={handleNextGuide}>Siguiente</button>
    </div>
  );
};