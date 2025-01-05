export function Instruction0({ handleNextGuide }: { handleNextGuide: () => void; }) {

  return (
    <div className="instruction0 instruction">
      <h3>Bienvenidos 🐾</h3>
      <p>SOS Patas es un espacio donde todos podemos ayudar a los animales perdidos o abandonados a encontrar un hogar. Solo tienes que marcar en el mapa la ubicación del animal, ¡y aparecerá en la lista de mascotas que necesitan ser rescatadas!</p>
      <button onClick={handleNextGuide}>Siguiente</button>
    </div>
  );
}