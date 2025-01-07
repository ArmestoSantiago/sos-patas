import { useMemo, useState } from 'react';
import { CatIcon, DogIcon, AddIcon, ResetLocationIcon } from '../../icons/PageIcons';
import { useLocationStore } from '../../stores/location';
import { usePetsStore } from '../../stores/pets';
import './MenuPanel.css';
import { PetsType } from '../../types/petsTypes.d';
import { ListContainer } from './ListContainer';
import { InputField } from './SearchInput';
import { GoogleLoginButton } from '../buttons/GoogleLoginButton/GoogleLoginButton';
import { useUserStore } from '../../stores/users';
import { GoogleLogoutButton } from '../buttons/GoogleLoginButton/GoogleLogoutButton';
import { ChangeLanguageButton } from '../buttons/ChangeLanguageButton/ChangeLanguageButton';

export function MenuPanel() {

  const userInfo = useUserStore(state => state.userInfo);
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
        <ChangeLanguageButton />
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
        {!userInfo && <GoogleLoginButton />}
        {userInfo &&
          (
            <div className='userinfo-container'>
              <div>
                <p>{userInfo.name}</p>
                <GoogleLogoutButton />
              </div>
              <img
                src={userInfo.photo ? userInfo.photo : 'public/avatar.png'}
                alt={`${userInfo.name} avatar`} />
            </div>
          )}
      </section >
    </>
  );
};