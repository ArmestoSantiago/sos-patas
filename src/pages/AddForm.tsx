import { Header } from '@/components/Header';
import { NavMenu } from '@/components/NavMenu';
import { AnimalForm } from '@/components/AnimalForm';

export function AddForm() {
  return (
    <>
      <Header title="Agregar mascota" />
      <AnimalForm />
      <NavMenu />
    </>
  );
}