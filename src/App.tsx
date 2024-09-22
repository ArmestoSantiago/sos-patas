import { useLocationStore } from './stores/location';
import { Maps } from './components/Map';

function App() {
  const location = useLocationStore(state => state.location);
  const newLocation = useLocationStore(state => state.newLocation);
  const reset = useLocationStore(state => state.reset);

  return (
    <>
      <button onClick={() => newLocation()}>change</button>
      <button onClick={() => reset()}>reset</button>
      {location && <Maps location={location}></Maps>}
    </>
  );
}

export default App;
