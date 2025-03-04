import { useEffect, useState } from 'react';
import { useLocationStore } from '@/stores/location.ts';

import { Map } from '@/components/Map/Map';
import { MenuPanel } from '@/components/MenuPanel/MenuPanel';
import { LoadingComponent } from '@/components/Loading/LoadingComponent';
import { FirstTimeInstruction } from '@/components/FirstTimeInstructions/FirstTimeInstructions';
import { AddAnimalForm } from '@/components/AddAnimalForm/AddAnimalForm';

import '@/App.css';

function App() {
  const location = useLocationStore(state => state.location);
  const fetchLocation = useLocationStore(state => state.fetchLocation);
  const locationNewAnimal = useLocationStore(state => state.locationNewAnimal);
  const openForm = useLocationStore(state => state.openForm);
  const [loading, setLoading] = useState<boolean>(true);
  const firstTimeValue = window.localStorage.getItem('first');
  const firstTime = firstTimeValue ? JSON.parse(firstTimeValue) : false;

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <main className='main-page'>
      {!firstTime && <FirstTimeInstruction />}
      {loading && <LoadingComponent />}
      {/* locationNewAnimal is used to send de coords where animal article will be render */}
      {/* openForm render de form */}
      {openForm && locationNewAnimal && <AddAnimalForm lat={locationNewAnimal.lat} lng={locationNewAnimal.lng} />}
      <Map
        location={location}
        setLoading={setLoading}
      >
      </Map>
      {!loading && <MenuPanel />}
    </main>
  );
}

export default App;

