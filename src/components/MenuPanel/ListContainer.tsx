import { useTextsStore } from '@stores/texts';
import { PetsState } from '@/types/petsTypes.d';
import { listContainerTextsGenerator } from '@utils/listContainerTextsGenerator';
import { petsPostedLocal } from '@/const/const';

export function ListContainer({ pets }: PetsState) {
  const texts = useTextsStore(state => state.texts.menuPanel);
  const petsToRender = pets.concat(petsPostedLocal);

  return (
    <main className='list-container'>
      {petsToRender.map(pet => {

        const {
          petTypeText,
          petTypeIcon,
          petConditionText,
          petConditionIcon,
          petDescriptionIcon
        } = listContainerTextsGenerator(pet, texts);

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