import { useLocationStore } from '@/stores/location';
import { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router';

export function PostButtons() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { setToAddAnimal, setNewAnimalLocation, newAnimalLocation } = useLocationStore();

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => { }, 500);
    navigate('/add', { state: newAnimalLocation });
    setToAddAnimal(false);
    setLoading(false);
  };

  const handleCancel = () => {
    setNewAnimalLocation();
    setToAddAnimal(false);
    navigate('/add', { state: null });
  };

  return (
    <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
      <button onClick={handleCancel} className="bg-white text-stone-700 px-6 py-3 rounded-full font-semibold shadow-lg border-2 border-stone-300 hover:bg-stone-50 transition-colors">Cancelar</button>
      <button disabled={loading} onClick={handleConfirm} className="bg-main relative text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#1B5E20] transition-colors disabled:cursor-not-allowed flex items-center gap-2">
        <span className={`${loading ? 'opacity-0' : ''}`}>Guardar Ubicación</span>
        {loading &&
          <span className="absolute inset-0 flex items-center justify-center">
            <Oval width={20} height={20} color="#fff" />
          </span>}
      </button>
    </div>
  );
}