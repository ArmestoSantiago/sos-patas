import { useLocationStore } from './stores/location';
import { signIn, signOutFn } from './services/login';
import { Map } from './components/Map';

function App() {
  const location = useLocationStore(state => state.location);
  const reset = useLocationStore(state => state.reset);

  const handleLogIn = async () => {
    const userInfo = await signIn();
  }
  
  return (
    <>
      <button style={{marginRight: 15}}onClick={handleLogIn}>Log IN</button>
      <button style={{marginRight: 15}}onClick={signOutFn}>Log OUT</button>
      <button onClick={() => reset()}>reset</button>
      <Map location={location}></Map> 
    </>
  );
}

export default App;

