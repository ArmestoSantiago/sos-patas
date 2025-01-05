export function Instruction1({ handleNextGuide }: { handleNextGuide: () => void; }) {
  return (
    <div className="instruction1 instruction">
      <p>¡Activa tu ubicación para una mejor experiencia!</p>
      <img src="public/activate-ubication-img.png" alt="activate location image" />
      <p>Si lo has rechazado y quieres activarlo haz click en el boton de ubicación, acepta y vuelve a recargar la página</p>
      <button onClick={handleNextGuide}>Siguiente</button>
    </div>
  );
}