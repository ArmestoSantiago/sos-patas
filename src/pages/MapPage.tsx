import { Header } from '@/components/Header';
import { NavMenu } from '@/components/NavMenu';
import { Map } from '@/components/Map/Map';
import { useState } from 'react';
import { Location } from '@/types/locationTypes';

export function MapPage({ userLocation }: MapPageProps) {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      <Header title="Mapa" />
      <Map userLocation={userLocation} setLoading={setLoading} />
      <NavMenu />
    </>
  );
}

interface MapPageProps {
  userLocation: Location;
}