import { PetsCondition, PetsInformation } from '@/types/petsTypes.d';
import { DistanceIcon, LocationIcon } from './Icons';
import { useLocationStore } from '@/stores/location';
import { useMemo } from 'react';
import { getDistance } from '@/utils/getDistance';

export function PublicationCard({ pets }: PublicationCardProps) {
  const { location } = useLocationStore();

  const initialUserLocation = useMemo(() => location, []);
  return (
    <>
      {pets.map((pet) => {

        const distance = getDistance(pet.lat, pet.lng, initialUserLocation);
        const distanceText = distance > 999 ? '> 999 km' : `${distance.toFixed(1)} km`;
        const conditionText = getHealInfo(pet.condition);

        return (
          <div key={pet.id} className='bg-white rounded-3xl overflow-hiden shadow-sm hover:shadow-md transition-all border border-stone-100 mb-4'>
            <div className='p-4 flex items-center gap-3'>
              <img src="public/user-test.png" alt="User Image" className='w-10 h-10 rounded-full object-cover' />
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-[#2A2A2A]">Nombre del Usuario</h3>
                <div className='flex items-center text-xs text-stone-500 gap-1 mt-1'>
                  <LocationIcon size={14}></LocationIcon>
                  <span>{pet.address}</span>
                </div>
              </div>
            </div>
            <div className='relative aspect-square'>
              <img src={pet.imgSrc} alt="pet-image" className='w-full h-full object-cover'></img>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-[#2A2A2A] mb-4 line-clamp-1">{
                pet.name
              }</h2>
              <p className="text-sm text-[#4A4A4A] mb-4 line-clamp-1">{pet.description}</p>
              <div className='flex items-center gap-3 mb-4'>
                <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-full">
                  <DistanceIcon></DistanceIcon>
                  <span className='text-sm font-semibold text-stone-700'>{distanceText}</span>
                </div>
                <div className={`flex text-sm rounded-full px-3 py-1 text-white font-semibold items-center gap-1 ${conditionText.backGround}`}>
                  <span>{conditionText.icon}</span>
                  <p>{conditionText.text}</p>
                </div>
              </div>
            </div >
          </div>
        );
      }
      )
      }
    </>
  );
}

interface PublicationCardProps {
  pets: PetsInformation[];
}

const healthStatus: Record<PetsCondition, { text: string; backGround: string; icon: string; }> = {
  [PetsCondition.HEALTHY]: {
    text: 'SANO',
    backGround: 'bg-[#22C55E]',
    icon: '✅'
  },
  [PetsCondition.WOUNDED]: {
    text: 'HERIDO',
    backGround: 'bg-[#F59E0B]',
    icon: '⚠️'
  },
  [PetsCondition.CRITICAL]: {
    text: 'GRAVE',
    backGround: 'bg-[#EF4444]',
    icon: '🚑'
  }
};

const getHealInfo = (condition: PetsCondition) => {
  return healthStatus[condition] || null;
};