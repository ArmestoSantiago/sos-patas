import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { MAP_CONFIGURATION } from '../const/const';
import { MapType } from '../types';

export function Maps({ location }: MapType) {
  const GOOGLE_MAPS_APIKEY = import.meta.env.VITE_GOOGLE_MAPS_APIKEY;
  console.log(location);
  return (
    <APIProvider apiKey={GOOGLE_MAPS_APIKEY} onLoad={() => console.log('Loaded')}>
      <Map
        {...MAP_CONFIGURATION}
        defaultCenter={location}
      >
      </Map>
    </APIProvider>
  );
} 