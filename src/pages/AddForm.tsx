import { Header } from '@/components/Header';
import { NavMenu } from '@/components/NavMenu';
import { PostForm } from '@/components/PostForm';
import { useLocation } from 'react-router';

export function AddForm() {
  const navigate = useLocation();
  const newAnimalLocation = navigate.state || null;

  return (
    <>
      <Header title="Agregar mascota" />
      <PostForm newAnimalLocation={newAnimalLocation ? newAnimalLocation : undefined} />
      <NavMenu />
    </>
  );
}