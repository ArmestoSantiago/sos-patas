import { useState } from 'react';
import { getLocationPrediction } from '../../services/getLocationPrediction';

export function InputField() {
  const [locations, setLocations] = useState<string[]>([]);

  const handleClear = () => {
    const input = document.querySelector('.location-input') as HTMLInputElement;
    input.value = '';
    setLocations([]);
  };

  console.log(locations, locations.length);

  const handleUserSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const predictions = await getLocationPrediction(e.target.value);
    console.log(predictions);
    const predictionsArray = predictions.map((prediction: { description: string; }) => prediction.description);
    setLocations(predictionsArray);
  };

  return (
    <>
      <div className='input-container'>
        <input
          id="autocomplete"
          className={`location-input ${locations.length > 0 && 'open-options'}`}
          onChange={(e) => { handleUserSearch(e); }}
          placeholder='Buenos Aires, Cordoba...'>
        </input>
        <button
          onClick={handleClear}
          className='clear-input'
        >✖</button>
      </div>
      {
        locations.length > 0 &&
        <div className='options-container'>
          {
            locations.slice(0, 3).map((location, index) => {
              return (
                <button
                  className='option-button'
                  key={index}
                >{location}
                </button>
              );
            })
          }
        </div>
      }
    </>
  );
};