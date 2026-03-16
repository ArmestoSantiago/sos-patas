import { useNavigate } from 'react-router';
import { CamaraIcon, CrossIcon, LocationIcon } from './Icons';
import { useLocationStore } from '@/stores/location';
import { ChangeEvent, useEffect, useState } from 'react';
import { getAddress } from '@/services/getAddress';
import { Location } from '@/types/locationTypes';
import { StatusButtons } from './StatusButtons';
import { PetsSituation, PetsType } from '@/types/petsTypes.d';
import { TypeButtons } from './TypeButtons';

export function PostForm({ newAnimalLocation }: AnimalFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [situation, setSituation] = useState<PetsSituation>(PetsSituation.ADOPTION);
  const [selectedType, setSelectedType] = useState<PetsType>(PetsType.DOG);
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const navigate = useNavigate();

  const { setToAddAnimal } = useLocationStore();
  const [addressNewAnimal, setAddressNewAnimal] = useState<string | null>(null);

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleRemoveImg = () => {
    setPreviewURL(null);
    setSelectedFile(null);
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

  return (
    <div className='flex w-full justify-center'>
      <div className="pb-20 my-6 mx-4 max-w-160 w-full">
        <form>
          <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="block text-sm font-semibold text-stone-700 mb-4">Foto del animal *</p>
            <label className={`flex flex-col items-center relative justify-center h-64 gap-1  ${!selectedFile && 'border-2 border-dashed border-stone-300 rounded-2xl'}   cursor-pointer hover:border-[#4CAF50] hover:bg-stone-50 transition-all`}>
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
              <input value={name} onChange={handleNameChange} data-testid="name-input" className='w-full bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all py-3 px-4' type="text" placeholder='Ej: Luna, Max, Michi' />
            </div>
            <div>
              <label className='block text-sm font-semibold text-stone-700 mt-8 mb-4' >
                Tipo de situación *
              </label>
              <div className='grid grid-cols-2 gap-3'>
                <StatusButtons handleClick={handleChangeStatus} situation={situation} />
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
                <button onClick={handleGetCoords} data-testid="location-button" type="button" className="w-full cursor-pointer text-left rounded-xl border-2 transition-all bg-stone-50 border-stone-200 hover:border-[#4CAF50] text-stone-400 py-3 px-4">
                  <div className='flex items-center gap-3'>
                    <LocationIcon />
                    <span>{addressNewAnimal ? addressNewAnimal : 'Seleccionar ubicación en el mapa'}</span>
                  </div>
                </button>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mt-8 mb-4">Descripción</label>
                <textarea value={description} onChange={handleDescriptionChange} maxLength={120} data-testid="description-input" className="w-full bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all pt-3 px-4 min-h-30" placeholder="Cuentanos sobre este animalito"></textarea>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" data-testid="cancel-button" className="flex-1 bg-white border-2 border-stone-300 text-stone-600 rounded-full font-semibold hover:bg-stone-50 transition-colors py-3 px-4" >Cancelar</button>
            <button type="submit" data-testid="submit-button" className="flex-1 bg-[#2E7D32] text-white rounded-full font-semibold hover:bg-[#1B5E20] transition-colors shadow-md py-3 px-4">Publicar</button>
          </div>
        </form >
      </div >
    </div>
  );
}

interface AnimalFormProps {
  newAnimalLocation?: Location;
}