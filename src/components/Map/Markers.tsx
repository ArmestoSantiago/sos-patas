import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { PetsInformation, PetsSituation, PetsState } from '../../types/petsTypes.d';
import { petsPostedLocal } from '@/const/const';

const selectBorderColor = (petSituation: PetsSituation) => {
  const colors = {
    ADOPTION: '#3B82F6',
    LOST: '#6B7280',
    RESCUE: '#F97316',
    TRANSITION: '#8B5CF6'
  };

  return colors[petSituation];
};

function Marker({ pet }: { pet: PetsInformation; }) {
  const color = selectBorderColor(pet.situation);
  return (
    <div className='w-14 h-14 rounded-full border-4 overflow-hidden shadow-lg cursor-pointer transform hover:scale-110 transition-all' style={{ borderColor: color }}>
      <img alt="pet image" src={pet.imgSrc} className='w-full h-full object-cover' />
    </div>
  );
}

export function RenderMarkers({ pets }: PetsState) {
  const petsToRender = pets.concat(petsPostedLocal);
  return (
    <>
      {petsToRender.map(pet => {

        const petLocation = {
          lat: pet.lat,
          lng: pet.lng
        };
        return (
          <AdvancedMarker style={{ scale: '150%' }}
            key={pet.id}
            position={petLocation}>
            <Marker pet={pet}></Marker>
          </AdvancedMarker>
        );
      })}
    </>
  );
}