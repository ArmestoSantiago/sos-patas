import { useState } from 'react';
import { CatIcon, DogIcon, AddIcon, ResetLocationIcon } from '../../icons/PageIcons';
import { useLocationStore } from '../../stores/location';
import { usePetsStore } from '../../stores/pets';
import './MenuPanel.css';

export function ListContainer({ petsList }) {

  return (
    <main className='list-container'>
      {petsList.map(pet => {
        const petTypeText = pet.type === 'DOG' ? 'Perro' : 'Gato';

        const petConditionText = pet.condition === 'HEALTHY' ? 'Sano' : pet.condition === 'WOUNDED' ? 'Herido' : 'Critico';

        return (
          <article className='pet-article' key={pet.id}>
            <div className='pet-container'>
              <img className='pet-thumbnail' src="./perro.jpg" alt="Pet Photo" />
              <div>
                <p>{petTypeText}</p>
                <p>{petConditionText}</p>
                <p>{pet.description}</p>
              </div>
            </div>
          </article>
        );
      })}
    </main>
  );
}

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
          <button className='filter-button'><DogIcon /></button>
          <button className='filter-button'><CatIcon /></button>
        </div>
        <p className='text'>Resultados</p>
        <ListContainer petsList={petsList} />
      </section>
    </>
  );
}