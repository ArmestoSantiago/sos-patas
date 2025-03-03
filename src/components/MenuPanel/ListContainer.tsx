import { useTextsStore } from '@stores/texts';
import { PetsState } from '@/types/petsTypes.d';
import { listContainerTextsGenerator } from '@utils/listContainerTextsGenerator';

export function ListContainer({ pets }: PetsState) {
  const texts = useTextsStore(state => state.texts.menuPanel);

  return (
    <main className='list-container'>
      {pets.map(pet => {

        const {
          petTypeText,
          petTypeIcon,
          petConditionText,
          petConditionIcon,
          petDescriptionIcon,
          petLocationIcon
        } = listContainerTextsGenerator(pet, texts);

        return (
          <article className='pet-article' key={pet.id}>
            <div className='pet-container'>
              <img
                className='pet-thumbnail'
                src={pet.imgSrc}
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
                <div className='pet-text'>
                  <p className='pet-icon'>{petLocationIcon}</p>
                  {pet.address}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </main>
  );
}