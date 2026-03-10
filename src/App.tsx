import { useEffect, useState } from 'react';
import { useLocationStore } from '@/stores/location.ts';
import { Route, Routes } from 'react-router';
import { Home } from '@/pages/Home';
import { MapPage } from '@/pages/MapPage';

import { MenuPanel } from '@/components/MenuPanel/MenuPanel';
import { LoadingComponent } from '@/components/Loading/LoadingComponent';
import { FirstTimeInstruction } from '@/components/FirstTimeInstructions/FirstTimeInstructions';
import { AddAnimalForm } from '@/components/AddAnimalForm/AddAnimalForm';
import { usePetsStore } from './stores/pets';

import '@/App.css';
import { useTextsStore } from './stores/texts';
import { ColorRing } from 'react-loader-spinner';
import { Header } from './components/Header';
import { Footer, NavMenu } from './components/NavMenu';
import { AddForm } from './pages/Add';
import { Map } from './components/Map/Map';

function App() {
  const texts = useTextsStore(state => state.texts);
  const location = useLocationStore(state => state.location);
  const loadingPets = usePetsStore(state => state.loadingPets);
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
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/map" element={<MapPage />}></Route>
        <Route path="/add" element={<AddForm />}></Route>
      </Routes>
    </>
  );
}

export default App;

