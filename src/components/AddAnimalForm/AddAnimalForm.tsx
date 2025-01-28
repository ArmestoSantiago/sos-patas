import { useRef } from 'react';
import { useTextsStore } from '../../stores/texts';
import { PetsCondition, PetsType } from '../../types/petsTypes.d';
import './AddAnimalForm.css';

export function AddAnimalForm() {
  const texts = useTextsStore(state => state.texts.addAnimalsForm);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChargeFile = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
  };

  return (
    <div className='add-animals_container'>
      <h2 className='add-animals_header-text'>{texts.primaryMessage}💖</h2>
      <form onSubmit={handleSubmit} className='animal-form'>
        <div className='form-field'>
          <span>Type</span>
          <select className='' name='petType' required>
            <option value={PetsType.DOG}>{texts.petType.dog} 🐶</option>
            <option value={PetsType.CAT}>{texts.petType.cat} 🐱</option>
          </select>
        </div>
        <div className='form-field'>
          <span>Condition</span>
          <select className='' name="petCondition" required>
            <option value={PetsCondition.HEALTHY}>{texts.petCondition.healthy} 💚</option>
            <option value={PetsCondition.WOUNDED}>{texts.petCondition.wounded} 🟠</option>
            <option value={PetsCondition.CRTICIAL}>{texts.petCondition.critical} 🩸</option>
          </select>
        </div>
        <div className='form-field'>
          <span>Description</span>
          <input type="textarea" name="petDescription" placeholder={texts.textareaPlaceholder} maxLength={111}></input>
        </div>
        <div className='form-field'>
          <span>Photo</span>
          <input
            name="petImg"
            type='file'
            className='file-input'
            ref={fileInputRef}
          />
          <button type='button' className='upload-img_button' onClick={handleChargeFile}>
            +
            <p>{texts.upload}</p>
          </button>
        </div>
        <div className='form-field'>
          <button type='submit'>{texts.done}</button>
        </div>
      </form>
    </div>
  );
};
