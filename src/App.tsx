import { useLocationStore } from './stores/location';
import { Map } from './components/Map/Map';
import { MenuPanel } from './components/MenuPanel/MenuPanel';
import './App.css';
import { useState } from 'react';
import { LoadingComponent } from './components/Loading/LoadingComponent';
import { FirstTimeInstruction } from './components/FirstTimeInstructions/FirstTimeInstructions';

function App() {
  const location = useLocationStore(state => state.location);
  const [loading, setLoading] = useState<boolean>(true);
  const firstTimeValue = window.localStorage.getItem('first');
  const firstTime = firstTimeValue ? JSON.parse(firstTimeValue) : false;

  return (
    <main className='main-page'>
      {!firstTime && <FirstTimeInstruction />}
      {loading && <LoadingComponent />}
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

