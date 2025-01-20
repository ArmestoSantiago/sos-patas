import './AddAnimalForm.css';

export function AddAnimalForm() {
  return (
    <div>
      <div>
        <h2>Gracias por ayudarlos 🐶 🐱</h2>
        <form>
          <div>
            <label>Type</label>
            <select className='' required></select>
          </div>
        </form>
      </div>
    </div>
  );
}