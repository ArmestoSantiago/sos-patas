import { useLocationStore } from './stores/location';
import { signIn } from './services/login';
import { Map } from './components/Map/Map';
import { MenuPanel } from './components/MenuPanel/MenuPanel';
import './App.css';

function App() {
  const location = useLocationStore(state => state.location);

  const handleLogIn = async () => {
    const userInfo = await signIn();
  };

  return (
    <main className='main-page'>
      <Map location={location}></Map>
      <MenuPanel />
    </main>
  );
}

export default App;

