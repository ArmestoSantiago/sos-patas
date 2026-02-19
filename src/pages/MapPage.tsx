import { Header } from '@/components/Header';
import { NavMenu } from '@/components/NavMenu';
import { Map } from '@/components/Map/Map';
import { useLocationStore } from '@/stores/location';
import { useEffect, useState } from 'react';

export function MapPage() {
  const location = useLocationStore(state => state.location);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchLocation = useLocationStore(state => state.fetchLocation);

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <>
      <Header title="Mapa" />
      <Map location={location} setLoading={setLoading} />
      <NavMenu />
    </>
  );
}