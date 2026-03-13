import { useNavigate } from 'react-router';
import { CamaraIcon, LocationIcon } from './Icons';
import { useLocationStore } from '@/stores/location';
import { useEffect, useState } from 'react';
import { getAddress } from '@/services/getAddress';
import { Location } from '@/types/locationTypes';

interface FormData {
  photo?: File;
  name: string;
  caseType: 'adoption' | 'lost' | 'rescue' | 'transit';
  location: string;
  description: string;
}

export function PostForm({ newAnimalLocation }: AnimalFormProps) {
  const navigate = useNavigate();
  const { setToAddAnimal } = useLocationStore();
  const [addressNewAnimal, setAddressNewAnimal] = useState<string | null>(null);
  console.log(newAnimalLocation);

  useEffect(() => {

    const getAddressText = async () => {
      if (!newAnimalLocation) return;

      const address = await getAddress(newAnimalLocation);
      setAddressNewAnimal(address);
    };

    getAddressText();

  }, [newAnimalLocation]);

  const handleGetCoords = () => {
    setToAddAnimal(true);
    navigate('/map');
  };

  return (
    <div className='flex w-full justify-center'>
      <div className="pb-20 my-6 mx-4 max-w-160 w-full">
        <form>
          <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <label className="block text-sm font-semibold text-stone-700 mb-4">Foto del animal *</label>
            <span>
              <label className="flex flex-col items-center justify-center h-64 gap-1 border-2 border-dashed border-stone-300 rounded-2xl cursor-pointer hover:border-[#4CAF50] hover:bg-stone-50 transition-all">
                <CamaraIcon />
                <div>
                  <p className='text-stone-600'>Toca para subir una foto</p>
                  <p className='text-sm text-semibold text-center text-stone-400'>JPG, PNG o WEBP</p>
                  <input id="image-upload" accept="image/*" data-testid="image-input" className="hidden" type="file"></input>
                </div>
              </label>
            </span>
          </div>
          <div className='bg-white rounded-3xl border border-stone-100 mt-6 p-6'>
            <div>
              <label className='block text-sm font-semibold text-stone-700 mb-4' >
                Nombre del animal *
              </label>
              <input data-testid="name-input" className='w-full bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all py-3 px-4' type="text" placeholder='Ej: Luna, Max, Michi' />
            </div>
            <div>
              <label className='block text-sm font-semibold text-stone-700 mt-8 mb-4' >
                Tipo de caso *
              </label>
              <div className='grid grid-cols-2 gap-3'>
                <label className='cursor-pointer'>
                  <input data-testid="status-adoption" className='sr-only'></input>
                  <div className='rounded-2xl text-center font-semibold transition-all border-2 bg-[#2E7D32] text-white border-[#2E7D32] p-4'>
                    <span>En adopción</span>
                  </div>
                </label>
                <label className='cursor-pointer'>
                  <input data-testid="status-lost" className='sr-only'></input>
                  <div className='rounded-2xl text-stone-600 text-center font-semibold transition-all border-2 bg-stone-50  border-stone-200 hover:border-[#4CAF50] p-4'>
                    <span>Perdido</span>
                  </div>
                </label>
                <label className='cursor-pointer'>
                  <input data-testid="status-rescue" className='sr-only'></input>
                  <div className='rounded-2xl text-stone-600 text-center font-semibold transition-all border-2 bg-stone-50  border-stone-200 hover:border-[#4CAF50] p-4'>
                    <span>Rescate</span>
                  </div>
                </label>
                <label className='cursor-pointer'>
                  <input data-testid="status-transition" className='sr-only'></input>
                  <div className='rounded-2xl text-stone-600 text-center font-semibold transition-all border-2 bg-stone-50  border-stone-200 hover:border-[#4CAF50] p-4' >
                    <span>En tránsito</span>
                  </div>
                </label>
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
                <textarea maxLength={120} data-testid="description-input" className="w-full bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all pt-3 px-4 min-h-30" placeholder="Cuentanos sobre este animalito"></textarea>
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