import { Header } from '@/components/Header';
import { NavMenu } from '@/components/NavMenu';
import { Map } from '@/components/Map/Map';
import { useState } from 'react';
import { Location } from '@/types/locationTypes';
import { PostButtons } from '@/components/PostButtons';
import { useLocationStore } from '@/stores/location';
import { usePetsStore } from '@/stores/pets';
import { Oval } from 'react-loader-spinner';
import { SearchLocation } from '@/components/SearchLocation';
import { ReturnToInitialLocationButton } from '@/components/ReturnToInitialLocationButton';

export function MapPage({ userLocation }: MapPageProps) {
  const { pets } = usePetsStore();
  const [loading, setLoading] = useState<boolean>(true);
  const { toAddAnimal } = useLocationStore();

  return (
    <>
      <Header title="Mapa" />
      <div className="absolute left-1/2 top-24 z-20 flex w-[calc(100%-2rem)] max-w-[39rem] -translate-x-1/2 items-start gap-3">
        <SearchLocation className="group min-w-0 flex-1" />
        <ReturnToInitialLocationButton />
      </div>
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
