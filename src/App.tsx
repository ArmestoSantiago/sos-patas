import { useLocationStore } from './stores/location';
import { signIn } from './services/login';
import { Map } from './components/Map/Map';
import { MenuPanel } from './components/MenuPanel/MenuPanel';
import './App.css';
import { useState } from 'react';
import { LoadingComponent } from './components/Loading/LoadingComponent';

function App() {
  const location = useLocationStore(state => state.location);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(loading);

  const handleLogIn = async () => {
    const userInfo = await signIn();
  };

  return (
    <main className='main-page'>
      {loading && <LoadingComponent />}
      <Map
        location={location}
        setLoading={setLoading}
      >
      </Map>
      <MenuPanel />
    </main>
  );
}

export default App;

