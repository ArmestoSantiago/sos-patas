import { useRef, useState } from 'react';
import { useTextsStore } from '@stores/texts';
import { PetsCondition, PetsType } from '@/types/petsTypes.d';
import './AddAnimalForm.css';
import { postAnimal } from '@services/postAnimal';
import { mapData } from '@utils/mapData';
import { useUserStore } from '@stores/users';
import { useLocationStore } from '@stores/location';
import { CloseIcon, SuccessIcon, UnsuccesIcon } from '@/icons/PageIcons';
import { TailSpin } from 'react-loader-spinner';

export function AddAnimalForm({ lat, lng }: AddAnimalFormProps) {
  const [image, setImage] = useState<undefined | string>(undefined);
  const selectFileRef = useRef<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [posted, setPosted] = useState<false | PostedStatus>(false);
  const texts = useTextsStore(state => state.texts.addAnimalsForm);
  const setOpenForm = useLocationStore(state => state.setOpenForm);
  const user = useUserStore(state => state.userInfo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChargeFile = () => {
    fileInputRef.current?.click();
  };

  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      selectFileRef.current = file;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if image is not selected return 
    if (!selectFileRef.current) {
      setPosted({ code: 400, posted: false });
      return;
    }
    setLoading(true);
    const mappedData = mapData(e);
    const data = {
      ...mappedData,
      lat, lng
    };

    const image = selectFileRef.current;

    const result: PostedStatus = await postAnimal({ data, user, image });
    setLoading(false);
    setPosted(result);
    if (result.posted) {
      setTimeout(() => {
        setOpenForm();
      }, 2000);
    }
  };

  return (
    <div className='add-animals_container'>
      <div className='close-button-container'>
        <button onClick={setOpenForm}><CloseIcon /></button>
      </div>
      <div className='flex-column'>
        <h2 className='add-animals_header-text'>{texts.primaryMessage}💖</h2>
        <form onSubmit={handleSubmit} className='animal-form'>
          <div className='form-field'>
            <span>{texts.pageTexts.typeSpanText}</span>
            <select className='form-select' name='petType' required>
              <option value={PetsType.DOG}>{texts.petType.dog} 🐶</option>
              <option value={PetsType.CAT}>{texts.petType.cat} 🐱</option>
            </select>
          </div>
          <div className='form-field'>
            <span>{texts.pageTexts.conditionSpanText}</span>
            <select className='form-select' name="petCondition" required>
              <option value={PetsCondition.HEALTHY}>{texts.petCondition.healthy} 💚</option>
              <option value={PetsCondition.WOUNDED}>{texts.petCondition.wounded} 🟠</option>
              <option value={PetsCondition.CRTICIAL}>{texts.petCondition.critical} 🩸</option>
            </select>
          </div>
          <div className='form-field'>
            <span>{texts.pageTexts.descriptionSpanText}</span>
            <textarea className='form-select text-area' name="petDescription" placeholder={texts.pageTexts.textareaPlaceholder} maxLength={111}></textarea>
          </div>
          <div className='form-field'>
            <span>{texts.pageTexts.photoSpanText}</span>
            <input
              name="petImg"
              type='file'
              className='file-input'
              onChange={handleImgUpload}
              ref={fileInputRef}
            />
            <button type='button' disabled={typeof image === 'string'} className='upload-img_button' onClick={handleChargeFile} style={image ? { backgroundImage: `url(${image})`, backgroundPosition: 'center', backgroundSize: 'cover', border: 'none' } : {}} >
              {!image && <>
                +
                <p>{texts.pageTexts.upload}</p>
              </>}
            </button>
          </div>
          {!loading && !posted && (<div className='form-field'>
            <button type='submit'>{texts.pageTexts.done}</button>
          </div>)}
          {loading && <div className="flex" style={{ marginTop: '2rem' }}>
            <TailSpin
              visible={true}
              height="50"
              width="50"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
          }
          {posted && posted.posted && <div className='flex-column'> <SuccessIcon /> <p>{texts.pageTexts.postedText}</p></div>}
          {posted && !posted.posted && <div className='flex-column'> <UnsuccesIcon /> <p>{posted.code === 429 ? texts.pageTexts.publicationsError : texts.pageTexts.validationError}</p></div>}
        </form>
      </div >
    </div >
  );
};

interface AddAnimalFormProps {
  lat: number;
  lng: number;
}

interface PostedStatus {
  posted: boolean,
  code?: number,
}