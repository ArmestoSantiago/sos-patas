import { PetsCondition } from '@/types/petsTypes.d';

export function ConditionButtons({ handleClick, selectedCondition }: ConditionButtonsProps) {
  const conditions = [PetsCondition.HEALTHY, PetsCondition.WOUNDED, PetsCondition.CRITICAL];
  const text: Record<PetsCondition, string> = {
    [PetsCondition.HEALTHY]: '✅ Sano',
    [PetsCondition.WOUNDED]: '⚠️ Herido',
    [PetsCondition.CRITICAL]: '🚑 Grave'
  };
  return (
    conditions.map(condition =>
      <label className='cursor-pointer' key={condition}>
        <input onClick={() => handleClick(condition)} data-testid={`status-${condition}`} className='sr-only'></input>
        <div className={`rounded-2xl text-stone-600 text-center font-semibold transition-all border-2   hover:border-[#2E7D32] p-4 ${condition === selectedCondition ? 'bg-[#2E7D32] text-white border-[#2E7D32]' : 'bg-stone-50 border-stone-200'}`}>
          <span>{text[condition]}</span>
        </div>
      </label>
    )
  );
}

interface ConditionButtonsProps {
  handleClick: (condition: PetsCondition) => void;
  selectedCondition: PetsCondition;
}