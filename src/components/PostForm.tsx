import { useNavigate } from 'react-router';
import { CamaraIcon, CrossIcon, LocationIcon } from './Icons';
import { useLocationStore } from '@/stores/location';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getAddress } from '@/services/getAddress';
import { Location } from '@/types/locationTypes';
import { StatusButtons } from './StatusButtons';
import { PetsCondition, PetsSituation, PetsType } from '@/types/petsTypes.d';
import { TypeButtons } from './TypeButtons';
import { validateData } from '@/utils/validateData';
import { postAnimal } from '@/services/postAnimal';
import { useUserStore } from '@/stores/users';
import { ConditionButtons } from './ConditionButtons';
import { Oval } from 'react-loader-spinner';

export function PostForm({ newAnimalLocation }: AnimalFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [situation, setSituation] = useState<PetsSituation>(PetsSituation.ADOPTION);
  const [selectedType, setSelectedType] = useState<PetsType>(PetsType.DOG);
  const [selectedCondition, setSelectedCondition] = useState<PetsCondition>(PetsCondition.HEALTHY);
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [addressNewAnimal, setAddressNewAnimal] = useState<string | null>(null);

  const [posted, setPosted] = useState<true | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tooManyPublication, setTooManyPublication] = useState<true | null>(null);

  const navigate = useNavigate();
  const { setToAddAnimal } = useLocationStore();
  const { userInfo } = useUserStore();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleChangeStatus = (status: PetsSituation) => {
    setSituation(status);
  };

  const handleChangeType = (type: PetsType) => {
    setSelectedType(type);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleRemoveImg = () => {
    setPreviewURL(null);
    setSelectedFile(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newAnimalLocation || !userInfo || !selectedFile) return;

    setError(null);

    const validatedData = validateData({ description, name, img: selectedFile, newAnimalLocation });

    if (validatedData) {
      const typeOfError = validatedData;
      setError(typeOfError);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        address: addressNewAnimal || 'Address',
        description,
        name,
        type: selectedType,
        situation,
        image: selectedFile,
        userInfo,
        lat: newAnimalLocation.lat,
        lng: newAnimalLocation.lng,
        condition: selectedCondition
      };

      const posted = await postAnimal(payload);
      if (posted.code === 429) return setTooManyPublication(true);
      if (posted.code === 200) {
        setPosted(true);
        handleResetDefaults();
        return;
      };

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {

    const getAddressText = async () => {
      if (!newAnimalLocation) return;

      const address = await getAddress(newAnimalLocation);
      setAddressNewAnimal(address);
    };

    getAddressText();

  }, [newAnimalLocation]);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewURL(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [selectedFile]);

  const handleGetCoords = () => {
    setToAddAnimal(true);
    navigate('/map');
  };

  const handleConditionChange = (condition: PetsCondition) => {
    setSelectedCondition(condition);
  };

  const handleResetDefaults = () => {
    setLoading(false);
    setSelectedCondition(PetsCondition.HEALTHY);
    setSelectedFile(null);
    setSituation(PetsSituation.ADOPTION);
    setSelectedType(PetsType.DOG);
    setName('');
    setPreviewURL(null);
    setError(null);
    setTooManyPublication(null);
    setAddressNewAnimal(null);
    setDescription('');
    navigate('/');
  };

  const handleCancel = () => {
    handleResetDefaults();
  };

  const handleNavigateToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className='flex w-full justify-center'>
      <div className="pb-20 my-6 mx-4 max-w-160 w-full">
        {!userInfo && <div className='flex items-center mb-4 gap-1'>
          <p>Debes estar logeado para publicar!</p>
          <button onClick={handleNavigateToProfile} className='cursor-pointer'><p className='text-decoration-line text-blue-900'>conectarse</p></button>
        </div>
        }
        <form>
          <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="block text-sm font-semibold text-stone-700 mb-4">Foto del animal *</p>
            <label className={`flex flex-col items-center relative justify-center h-64 gap-1 ${error === 'img' ? 'border-red-600!' : 'border-stone-200'}  ${!selectedFile && 'border-2 border-dashed border-stone-300 rounded-2xl'}   cursor-pointer hover:border-[#4CAF50] hover:bg-stone-50 transition-all`}>
              {!previewURL ?
                <>
                  <CamaraIcon />
                  <div>
                    <p className='text-stone-600'>Toca para subir una foto</p>
                    <p className='text-sm text-semibold text-center text-stone-400'>JPG, PNG o WEBP</p>
                    <input onChange={handleFileChange} id="image-upload" accept="image/*" data-testid="image-input" className="hidden" type="file"></input>
                  </div>
                </> :
                <>
                  <button onClick={handleRemoveImg} className='absolute top-3 right-3 z-30 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer shadow-lg'>
                    <CrossIcon />
                  </button>
                  <img src={previewURL} className='w-full h-full object-cover rounded-2xl' />
                </>
              }
            </label>
          </div>
          <div className='bg-white rounded-3xl border border-stone-100 mt-6 p-6'>
            <div>
              <label className='block text-sm font-semibold text-stone-700 mb-4' >
                Nombre del animal *
              </label>
              <input value={name} onChange={handleNameChange} data-testid="name-input" className={`w-full bg-stone-50 border ${error === 'name' ? 'border-red-600' : 'border-stone-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all py-3 px-4`} type="text" placeholder='Ej: Luna, Max, Michi' />
            </div>
            <div>
              <label className='block text-sm font-semibold text-stone-700 mt-8 mb-4' >
                Tipo de situación *
              </label>
              <div className='grid grid-cols-2 gap-3'>
                <StatusButtons handleClick={handleChangeStatus} situation={situation} />
              </div>
              <label className='block text-sm font-semibold text-stone-700 mt-8 mb-4' >
                Condición *
              </label>
              <div className='grid grid-cols-2 gap-3'>
                <ConditionButtons handleClick={handleConditionChange} selectedCondition={selectedCondition} />
              </div>
              <div>
                <label className='block text-sm font-semibold text-stone-700 mt-8 mb-4' >
                  Especie *
                </label>
                <div className='grid grid-cols-1 gap-3'>
                  <TypeButtons handleClick={handleChangeType} selectedType={selectedType} />
                </div>
              </div>
              <div>
                <label className='block text-sm font-semibold text-stone-700 mt-8 mb-4'>Ubicación *</label>
                <button onClick={handleGetCoords} data-testid="location-button" type="button" className={`w-full cursor-pointer text-left rounded-xl border-2 transition-all bg-stone-50 ${error === 'location' ? 'border-red-600' : 'border-stone-200'} hover:border-[#4CAF50] text-stone-400 py-3 px-4`}>
                  <div className='flex items-center gap-3'>
                    <LocationIcon />
                    <span>{addressNewAnimal ? addressNewAnimal : 'Seleccionar ubicación en el mapa'}</span>
                  </div>
                </button>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mt-8 mb-4">Descripción</label>
                <textarea value={description} onChange={handleDescriptionChange} maxLength={120} data-testid="description-input" className={`w-full bg-stone-50 border ${error === 'description' ? 'border-red-600' : 'border-stone-200'}  rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all pt-3 px-4 min-h-30`} placeholder="Cuentanos sobre este animalito"></textarea>
              </div>
            </div>
          </div>
          {tooManyPublication && <p className='text-red-600 text-center mt-4 transition-all
          
          '>Demasiadas Publicaciones</p>}
          {error && <p className='text-red-600 text-center mt-4 transition-all
          
          '>Complete los campos obligatorios</p>}
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={handleCancel} disabled={loading} data-testid="cancel-button" className="flex-1 cursor-pointer bg-white border-2 border-stone-300 text-stone-600 rounded-full font-semibold hover:bg-stone-50 transition-colors py-3 px-4" >Cancelar</button>
            <button disabled={loading} type="submit" onClick={handleSubmit} data-testid="submit-button" className="flex-1 cursor-pointer disabled:bg-stone-300 bg-main text-white rounded-full font-semibold relative hover:bg-[#1B5E20] transition-colors shadow-md py-3 px-4">
              {loading && <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <Oval height={24} width={24} color="#000" />
              </div>}
              <p className={`${loading && 'opacity-0'}`}>Publicar</p>
            </button>
          </div>
        </form >
      </div >
    </div >
  );
}

interface AnimalFormProps {
  newAnimalLocation?: Location;
}