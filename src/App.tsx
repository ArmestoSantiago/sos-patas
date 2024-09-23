import { useLocationStore } from './stores/location';
import { Map } from './components/Map';

function App() {
  const location = useLocationStore(state => state.location);
  const reset = useLocationStore(state => state.reset);

  return (
    <>
      <button onClick={() => reset()}>reset</button>
      <Map location={location}></Map>
    </>
  );
}

export default App;
