import { PetsSituation } from '@/types/petsTypes.d';

export function StatusButtons({ handleClick, situation }: StatusButtonsProps) {
  const status: PetsSituation[] = [PetsSituation.ADOPTION, PetsSituation.LOST, PetsSituation.RESCUE, PetsSituation.TRANSITION];

  const text: Record<PetsSituation, string> = {
    [PetsSituation.ADOPTION]: 'Adopción',
    [PetsSituation.LOST]: 'Perdido',
    [PetsSituation.RESCUE]: 'Rescate',
    [PetsSituation.TRANSITION]: 'Transito',
  };

  return (
    status.map(state =>
      <label className='cursor-pointer' key={state}>
        <input onClick={() => handleClick(state)} data-testid={`status-${state}`} className='sr-only'></input>
        <div className={`rounded-2xl text-stone-600 text-center font-semibold transition-all border-2   hover:border-[#2E7D32] p-4 ${situation === state ? 'bg-[#2E7D32] text-white border-[#2E7D32]' : 'bg-stone-50 border-stone-200'}`}>
          <span>{text[state]}</span>
        </div>
      </label>
    )
  );
}

interface StatusButtonsProps {
  handleClick: (status: PetsSituation) => void,
  situation: PetsSituation;
}