import { useLocationStore } from '@stores/location';
import { RenderMarkers } from './Markers';
import { Location } from '@/types/locationTypes';
import { MAP_CONFIGURATION } from '@/const/const';
import { APIProvider, Map as GoogleMap, MapEvent, } from '@vis.gl/react-google-maps';
import { customTimeout } from '@utils/timeout';
import { GOOGLE_MAPS_APIKEY } from '@/config';
import { useState } from 'react';
import { RenderNewAnimalLocationMarker } from './RenderNewAnimalLocationMarker';
import { PetsInformation } from '@/types/petsTypes';

export function Map({ userLocation, setLoading, toAddAnimal, pets }: MapProps) {
  const [draggable, setDraggable] = useState<boolean>(false);
  const { newLocation, newAnimalLocation, setNewAnimalLocation } = useLocationStore();

  const handleDragStart = () => {
    // defaultCenter prop enable the posibility to drag the map but unable the posibility of change the location programatically
    // so we enable it while map is dragring
    setDraggable(true);
  };

  const handleClick = (map: MapEvent) => {
    const detail = map.detail as { latLng: google.maps.LatLng; };
    if (detail.latLng) {
      const { lat, lng } = detail.latLng;
      setNewAnimalLocation(lat, lng);
    }
  };

  const handleDragEnd = ({ map }: MapEvent) => {
    const lat = map.getCenter()?.lat();
    const lng = map.getCenter()?.lng();

    if (lat && lng)
      newLocation(lat, lng);

    setDraggable(false);
    // at the end of the drag we disable defaultCenter prop. Now center is defined, so we can change center programatically
  };

  return (
    <div style={{ height: 'calc(100vh - 120px)', width: '100vw' }}>
      <APIProvider apiKey={GOOGLE_MAPS_APIKEY} onLoad={() => customTimeout({ callback: setLoading, delay: 1000, args: false })}>
        <GoogleMap
          {...MAP_CONFIGURATION}
          center={draggable ? undefined : userLocation}
          defaultCenter={draggable ? userLocation : undefined}
          onDragstart={handleDragStart}
          onDragend={(map) => handleDragEnd(map)}
          draggableCursor={toAddAnimal ? 'crosshair' : ''}
          onClick={toAddAnimal ? (map) => handleClick(map) : undefined}
        >
          {newAnimalLocation && toAddAnimal && <RenderNewAnimalLocationMarker newAnimalLocation={newAnimalLocation} />}
          <RenderMarkers pets={pets} ></RenderMarkers>
        </GoogleMap>
      </APIProvider>
    </div >
  );
};

interface MapProps {
  pets: PetsInformation[];
  userLocation: Location,
  newAnimalLocation?: Location;
  toAddAnimal?: boolean;
  setLoading: (args: boolean) => void;
}
