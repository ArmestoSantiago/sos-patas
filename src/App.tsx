import { Route, Routes } from 'react-router';
import { Home } from '@/pages/Home';
import { MapPage } from '@/pages/MapPage';
import { AddForm } from './pages/AddForm';
import { Chat } from './pages/Chat';
import { Profile } from './pages/Profile';
import { useEffect } from 'react';
import { useLocationStore } from './stores/location';

function App() {
  const { location, fetchLocation } = useLocationStore();

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/map" element={<MapPage userLocation={location} />}></Route>
        <Route path="/add" element={<AddForm />}></Route>
        <Route path="/chats" element={<Chat />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;

