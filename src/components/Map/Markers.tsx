import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { PetsState } from '../../types/petsTypes.d';
import { petsPostedLocal } from '@/const/const';

function Marker() {
  return <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />;
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
            <Marker></Marker>
          </AdvancedMarker>
        );
      })}
    </>
  );

}