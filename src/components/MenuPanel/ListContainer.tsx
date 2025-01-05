import { PetsState } from '../../types/petTypes';

export function ListContainer({ pets }: PetsState) {

  return (
    <main className='list-container'>
      {pets.map(pet => {
        const petTypeText = pet.type === 'DOG' ? 'Perro' : 'Gato';
        const petTypeIcon = pet.type === 'DOG' ? '🐶' : '🐱';
        const petConditionText = pet.condition === 'HEALTHY' ? 'Sano' : pet.condition === 'WOUNDED' ? 'Herido' : 'Critico';
        const petConditionIcon = pet.condition === 'HEALTHY' ? '💚' : pet.condition === 'WOUNDED' ? '🟠' : '🩸';
        const petDescriptionIcon = '📖';

        return (
          <article className='pet-article' key={pet.id}>
            <div className='pet-container'>
              <img
                className='pet-thumbnail'
                src="./perro.jpg"
                alt="Pet Photo" />
              <div>
                <div className='pet-text'>
                  <p className='pet-icon'>{petTypeIcon}</p>
                  {petTypeText}
                </div>
                <div className='pet-text'>
                  <p className='pet-icon'>{petConditionIcon}</p>
                  {petConditionText}
                </div>
                <div className='pet-text'>
                  <p className='pet-icon'>{petDescriptionIcon}</p>
                  {pet.description}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </main>
  );
}