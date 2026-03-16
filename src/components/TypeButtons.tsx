import { PetsType } from '@/types/petsTypes.d';

export function TypeButtons({ handleClick, selectedType }: TypeButtonsProps) {
  const types = [PetsType.DOG, PetsType.CAT];
  const text: Record<PetsType, string> = {
    [PetsType.DOG]: '🐶 PERRO',
    [PetsType.CAT]: '😺 GATO'
  };
  return (
    types.map(type => {
      return (
        <label className='cursor-pointer' key={type}>
          <input onClick={() => handleClick(type)} data-testid={`status-${type}`} className='sr-only'></input>
          <div className={`rounded-2xl text-stone-600 text-center font-semibold transition-all border-2   hover:border-[#2E7D32] p-4 ${selectedType === type ? 'bg-[#2E7D32] text-white border-[#2E7D32]' : 'bg-stone-50 border-stone-200'}`}>
            <span>{text[type]}</span>
          </div>
        </label >
      );
    })
  );
}

interface TypeButtonsProps {
  handleClick: (type: PetsType) => void;
  selectedType: PetsType;
}