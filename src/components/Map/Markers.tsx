import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { PetsState } from '../../types/petsTypes.d';

function Marker() {
  return <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />;
}

export function RenderMarkers({ pets }: PetsState) {

  return (
    <>
      {pets.map(pet => {
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