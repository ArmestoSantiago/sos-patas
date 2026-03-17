import { PetsCondition, PetsInformation, PetsSituation, PetsType } from '@/types/petsTypes.d';
import { DistanceIcon, LocationIcon } from './Icons';
import { useLocationStore } from '@/stores/location';
import { useEffect, useMemo, useState } from 'react';
import { getDistance } from '@/utils/getDistance';
import { getAllUser } from '@/services/getUsers';
import { User } from '@/types/usersTypes.d';

export function PublicationCard({ pets }: PublicationCardProps) {
  const { location } = useLocationStore();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const users = await getAllUser();
      setUsers(users);
    };
    getUsers();
  }, []);

  const initialUserLocation = useMemo(() => location, []);
  return (
    <>
      {pets.reverse().map((pet) => {
        const petsTypeEmote = pet.type === PetsType.DOG ? '🐶' : '😺';
        const distance = getDistance(pet.lat, pet.lng, initialUserLocation);
        const distanceText = distance > 999 ? '> 999 km' : `${distance.toFixed(1)} km`;
        const conditionText = getHealInfo(pet.condition);
        const situationText = getHealInfo(pet.situation);
        const publicationUserInfo = users.find(user => pet.user_id === user.id);

        return (
          <div key={pet.id} className='bg-white rounded-3xl w-full overflow-hiden shadow-sm hover:shadow-md transition-all border border-stone-100 mb-4'>
            <div className='p-4 flex items-center gap-3'>
              <img loading="lazy" src={publicationUserInfo?.photoURL} onError={(e) => { e.currentTarget.src = 'user-test.png'; }} alt="User Image" className='w-10 h-10 rounded-full object-cover' />
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-[#2A2A2A]">{publicationUserInfo?.name}</h3>
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
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-[#2A2A2A] line-clamp-1">
                  {petsTypeEmote}
                  {
                    pet.name
                  }</h2>
                <div className={`flex text-sm rounded-full px-3 py-1 text-white font-semibold items-center gap-1 ${situationText.backGround}`}>
                  <span>{situationText.icon}</span>
                  <p>{situationText.text}</p>
                </div>
              </div>
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

const healthStatus: Record<PetsCondition | PetsSituation, { text: string; backGround: string; icon: string; }> = {
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
  },
  [PetsSituation.ADOPTION]: {
    text: 'ADOPCIÓN',
    backGround: 'bg-[#3B82F6]',
    icon: '🏠'
  },
  [PetsSituation.LOST]: {
    text: 'PERDIDO',
    backGround: 'bg-[#6B7280]',
    icon: '❓',
  },
  [PetsSituation.RESCUE]: {
    text: 'RESCATE',
    backGround: 'bg-[#F97316]',
    icon: '🆘',
  },
  [PetsSituation.TRANSITION]: {
    text: 'TRANSICIÓN',
    backGround: 'bg-[#8B5CF6]',
    icon: '🔄',
  }
};

const getHealInfo = (condition: PetsCondition | PetsSituation) => {
  return healthStatus[condition] || null;
};