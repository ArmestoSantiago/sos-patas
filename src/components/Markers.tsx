import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { PetsState } from '../types';

function Marker() {
  return <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />;
}

export function RenderMarkers({ pets }: PetsState) {

  return (
    <>
      {pets.map(pet => {
        return (
          <AdvancedMarker
            key={pet.id}
            position={pet.location}>
            <Marker></Marker>
          </AdvancedMarker>
        );
      })}
    </>
  );

}