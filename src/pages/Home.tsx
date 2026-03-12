import { Filters } from '@/components/Filters';
import { Header } from '@/components/Header';
import { LoadingComponent } from '@/components/LoadingComponent';
import { NavMenu } from '@/components/NavMenu';
import { PublicationCard } from '@/components/PublicationCard';
import { usePetsStore } from '@/stores/pets';
import { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';

export function Home() {
  const { fetchPets, pets } = usePetsStore();
  const [filtered, setFiltered] = useState<string>('ALL');
  const [loading, setLoading] = useState<boolean>(false);

  const onFilterChange = (filter: string) => {
    if (filter === filtered) return setFiltered('ALL');
    if (filter === 'ALL') return setFiltered('ALL');
    setFiltered(filter);
  };

  const filteredPets = filtered != 'ALL' ? pets.filter(pet => pet.situation === filtered) : pets;

  useEffect(() => {
    setLoading(true);
    fetchPets();
    setLoading(false);
  }, []);

  return (
    <>
      <Header title="SOS Patas" />
      <Filters filtered={filtered} onFilterChange={onFilterChange}></Filters>
      {loading ? <LoadingComponent /> : <div className='max-w-2xl mx-auto px-4 py-6 pb-20'>
        <PublicationCard pets={filteredPets} />
      </div>
      }
      <NavMenu />
    </>
  );
}
