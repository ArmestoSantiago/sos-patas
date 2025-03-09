import { useMemo, useState } from 'react';
import { AddIcon, CatIcon, DogIcon, DownArrow, ResetLocationIcon, UpArrow } from '@icons/PageIcons';
import { useLocationStore } from '@stores/location';
import { usePetsStore } from '@stores/pets';
import './MenuPanel.css';
import { PetsType } from '@/types/petsTypes.d';
import { ListContainer } from './ListContainer';
import { InputField } from './SearchInput';
import { ChangeLanguageButton } from '@components/buttons/ChangeLanguageButton/ChangeLanguageButton';
import { UserInfo } from './UserInfo';
import { useTextsStore } from '@stores/texts';
import { petsPostedLocal } from '@/const/const';
import { getLocation } from '@/services/getLocation';

export function MenuPanel() {

  const resetLocation = useLocationStore(state => state.resetLocation);
  const setToAddAnimal = useLocationStore(state => state.setToAddAnimal);
  const [translate, setTranslate] = useState<boolean>(true);
  const [filter, setFilter] = useState<false | PetsType>(false);
  const texts = useTextsStore(state => state.texts.menuPanel);
  const pets = usePetsStore(state => state.pets);
  const petsToRender = pets.concat(petsPostedLocal);

  const handleAddAnimal = () => {
    setToAddAnimal(true);
  };

  const handleFilter = (type: PetsType) => {
    if (filter === type) return setFilter(false);
    setFilter(type);
  };

  const filteredPets = useMemo(() => {
    return filter
      ? petsToRender.filter(pet => pet.type === filter)
      : petsToRender;
  }, [pets, filter]);

  const handleTranslate = () => {
    setTranslate(!translate);
  };

  const handleResetLocation = async () => {
    const location = await getLocation();
    resetLocation(location.lat, location.lng);
  };

  return (
    <>
      <ChangeLanguageButton />
      <div className={`buttons_add_relocate-container ${translate && 'buttons_add_relocate-container-translate'}`}>
        <button
          onClick={handleResetLocation}
          className='btn btn-relocate'>
          <ResetLocationIcon />
        </button>
        <button onClick={handleAddAnimal} className='btn btn-add'><AddIcon /></button>
      </div>
      <section className={`menu-container ${translate && 'menu-container-translate'}`}>
        <button onClick={handleTranslate} className='menu-toggler'>
          {translate ? <UpArrow /> : <DownArrow />}
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
        <p className='text'>{texts.result}</p>
        <ListContainer pets={filteredPets} />
        <UserInfo />
      </section >
    </>
  );
};