import { useState } from 'react';
import { CatIcon, DogIcon, AddIcon, ResetLocationIcon } from '../../icons/PageIcons';
import { useLocationStore } from '../../stores/location';
import { usePetsStore } from '../../stores/pets';
import './MenuPanel.css';
import { ListContainer } from './ListContainer';

export function MenuPanel() {
  const resetLocation = useLocationStore(state => state.resetLocation);
  const [filter, setFilter] = useState(false);
  const pets = usePetsStore(state => state.pets);

  const handleFilter = (type) => {
    if (!filter) {
      setFilter(type);
    }
  };

  const petsList = pets;

  const handleTranslate = () => {
    const menu = document.querySelector('.menu-container');
    const buttonsAddRelocateContainer = document.querySelector('.buttons_add_relocate-container');
    menu?.classList.toggle('menu-container-translate');
    buttonsAddRelocateContainer?.classList.toggle('buttons_add_relocate-container-translate');
  };

  return (
    <>
      <div className='buttons_add_relocate-container buttons_add_relocate-container-translate'>
        <button onClick={resetLocation} className='btn btn-relocate'><ResetLocationIcon /></button>
        <button className='btn btn-add'><AddIcon /></button>
      </div>
      <section className='menu-container menu-container-translate'>
        <button onClick={handleTranslate} className='menu-toggler'>
          <div className='line-button'></div>
        </button>
        <div className='input-container'>
          <input className='location-input' placeholder='Buenos Aires, Cordoba...'>
          </input>
          <button className='clear-input'>X</button>
        </div>
        <div className='filter-container'>
          <button onClick={handleFilter} className='filter-button'><DogIcon /></button>
          <button className='filter-button'><CatIcon /></button>
        </div>
        <p className='text'>Resultados</p>
        <ListContainer petsList={petsList} />
      </section>
    </>
  );
}