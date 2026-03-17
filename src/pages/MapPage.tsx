import { Header } from '@/components/Header';
import { NavMenu } from '@/components/NavMenu';
import { Map } from '@/components/Map/Map';
import { useState } from 'react';
import { Location } from '@/types/locationTypes';
import { PostButtons } from '@/components/PostButtons';
import { useLocationStore } from '@/stores/location';
import { usePetsStore } from '@/stores/pets';
import { Oval } from 'react-loader-spinner';

export function MapPage({ userLocation }: MapPageProps) {
  const { pets } = usePetsStore();
  const [loading, setLoading] = useState<boolean>(true);
  const { toAddAnimal } = useLocationStore();

  return (
    <>
      <Header title="Mapa" />
      {toAddAnimal && <PostButtons />}
      {loading && <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30'><Oval color='#2E7D32' /></div>}
      <Map userLocation={userLocation} setLoading={setLoading} toAddAnimal={toAddAnimal} pets={pets} />
      <NavMenu />
    </>
  );
}

interface MapPageProps {
  userLocation: Location;
}