import { PetsState } from '../../types.d';

export function ListContainer({ pets }: PetsState) {

  return (
    <main className='list-container'>
      {pets.map(pet => {
        const petTypeText = pet.type === 'DOG' ? 'Perro' : 'Gato';
        const petTypeIcon = pet.type === 'DOG' ? '🐶' : '🐱';

        console.log('Switch');

        const petConditionText = pet.condition === 'HEALTHY' ? '💚 Sano' : pet.condition === 'WOUNDED' ? '🟠 Herido' : '🩸 Critico';

        return (
          <article className='pet-article' key={pet.id}>
            <div className='pet-container'>
              <img className='pet-thumbnail' src="./perro.jpg" alt="Pet Photo" />
              <div>
                <p>{`${petTypeText}`}</p>
                <p>{petConditionText}</p>
                <p>{`📖 ${pet.description}`}</p>
              </div>
            </div>
          </article>
        );
      })}
    </main>
  );
}