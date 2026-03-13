import { Location } from '@/types/locationTypes';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { SelectedLocationIcon } from '../Icons';

export function RenderNewAnimalLocationMarker({ newAnimalLocation }: RenderNewAnimalLocationMarkerProps) {
  const { lat, lng } = newAnimalLocation;
  if (!lat || !lng) return;

  return <AdvancedMarker
    position={newAnimalLocation}>
    <SelectedLocationIcon />
  </AdvancedMarker>;
}

interface RenderNewAnimalLocationMarkerProps {
  newAnimalLocation: Location;
}