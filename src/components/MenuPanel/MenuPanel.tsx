import { useMemo, useState } from 'react';
import { CatIcon, DogIcon, AddIcon, ResetLocationIcon } from '../../icons/PageIcons';
import { useLocationStore } from '../../stores/location';
import { usePetsStore } from '../../stores/pets';
import './MenuPanel.css';
import { PetsType } from '../../types.d';
import { ListContainer } from './ListContainer';
import { getLocationPrediction } from '../../services/getLocationPrediction';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { InputField } from './SearchInput';

export function MenuPanel() {
  const resetLocation = useLocationStore(state => state.resetLocation);
  const [translate, setTranslate] = useState<boolean>(true);
  const [filter, setFilter] = useState<false | PetsType>(false);
  const pets = usePetsStore(state => state.pets);

  const handleFilter = (type: PetsType) => {
    if (filter === type) return setFilter(false);
    setFilter(type);
  };

  const filteredPets = useMemo(() => {
    return filter
      ? pets.filter(pet => pet.type === filter)
      : pets;
  }, [pets, filter]);

  const handleTranslate = () => {
    setTranslate(!translate);
  };

  const handleSearch = (input: string) => {
    getLocationPrediction(input);
  };

  return (
    <>
      <div className={`buttons_add_relocate-container ${translate && 'buttons_add_relocate-container-translate'}`}>
        <button
          onClick={resetLocation}
          className='btn btn-relocate'>
          <ResetLocationIcon />
        </button>
        <button className='btn btn-add'><AddIcon /></button>
      </div>
      <section className={`menu-container ${translate && 'menu-container-translate'}`}>
        <button onClick={handleTranslate} className='menu-toggler'>
          <div className='line-button'></div>
        </button>
        <InputField />
        <div className='filter-container'>
          <button
            className='filter-button'
            onClick={() => { handleFilter(PetsType.DOG); }}>
            <DogIcon />
          </button>
          <button
            className='filter-button'
            onClick={() => { handleFilter(PetsType.CAT); }}>
            <CatIcon />
          </button>
        </div>
        <p className='text'>Resultados</p>
        <ListContainer pets={filteredPets} />
      </section >
    </>
  );
};