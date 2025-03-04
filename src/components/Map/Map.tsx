import { usePetsStore } from '@stores/pets';
import { useLocationStore } from '@stores/location';
import { RenderMarkers } from './Markers';
import { Location } from '@/types/locationTypes';
import { MAP_CONFIGURATION } from '@/const/const';
import { APIProvider, Map as GoogleMap, MapEvent, MapMouseEvent } from '@vis.gl/react-google-maps';
import { customTimeout } from '@utils/timeout';
import { GOOGLE_MAPS_APIKEY } from '@/config';
import { useEffect } from 'react';

export function Map({ location, setLoading }: MapProps) {
  const draggable = useLocationStore(state => state.draggable);
  const toAddAnimal = useLocationStore(state => state.toAddAnimal);
  const setToAddAnimal = useLocationStore(state => state.setToAddAnimal);
  const setLocationNewAnimal = useLocationStore(state => state.setLocationNewAnimal);
  const setOpenForm = useLocationStore(state => state.setOpenForm);
  const setDraggable = useLocationStore(state => state.setDraggable);
  const newLocation = useLocationStore(state => state.newLocation);
  const pets = usePetsStore(state => state.pets);
  const fetchPets = usePetsStore(state => state.fetchPets);

  useEffect(() => {
    fetchPets();
  }, []);

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (toAddAnimal || e.key === 'Escape') setToAddAnimal(false);
  });

  const handleAddAnimal = (map: MapMouseEvent) => {
    // Change cursor style to crosshair so user can select location where to add pet on list. 
    // Then change locationNewAnimal state to the location user selected

    if (!toAddAnimal) return;
    if (map.detail.latLng) {
      const { lat, lng } = map.detail.latLng;
      setLocationNewAnimal(lat, lng);
      setOpenForm();
    }
  };

  const handleDragStart = () => {
    // defaultCenter prop enable the posibility to drag the map but unable the posibility of change the location programatically
    // so we enable it while map is dragring
    setDraggable();
  };

  const handleDragEnd = ({ map }: MapEvent) => {
    const lat = map.getCenter()?.lat();
    const lng = map.getCenter()?.lng();

    if (lat && lng)
      newLocation(lat, lng);

    setDraggable();
    // at the end of the drag we disable defaultCenter prop. Now center is defined, so we can change center programatically
  };

  return (
    <APIProvider apiKey={GOOGLE_MAPS_APIKEY} onLoad={() => customTimeout({ callback: setLoading, delay: 1000, args: false })}>
      <GoogleMap
        {...MAP_CONFIGURATION}
        center={draggable ? undefined : location}
        defaultCenter={draggable ? location : undefined}
        onDragstart={handleDragStart}
        onDragend={(map) => handleDragEnd(map)}
        onClick={(map) => handleAddAnimal(map)}
        draggableCursor={toAddAnimal ? 'crosshair' : ''}
      >
        {<RenderMarkers pets={pets}></RenderMarkers>}
      </GoogleMap>
    </APIProvider>
  );
};

interface MapProps {
  location: Location,
  setLoading: (args: boolean) => void;
}
