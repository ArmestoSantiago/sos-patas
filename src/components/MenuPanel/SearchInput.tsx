import { useEffect, useRef, useState } from 'react';
import { getLocationPrediction } from '@services/getLocationPrediction';
import { getGeocode } from '@services/getGeocode';
import { useLocationStore } from '@stores/location';
import { Location } from '@/types/geocodeTypes.d';
import { ThreeDots } from 'react-loader-spinner';
import { LocationIcon } from '@icons/PageIcons';
import { useTextsStore } from '@/stores/texts';

export function InputField({ translate }: InputFieldProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [locations, setLocations] = useState<string[]>([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const newLocation = useLocationStore(state => state.newLocation);
  const texts = useTextsStore(state => state.texts);

  const handleClear = () => {
    const input = document.querySelector('.location-input') as HTMLInputElement;
    input.value = '';
    setLocations([]);
    setOptionsOpen(false);
    setLoading(false);
  };

  const handleUserSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setOptionsOpen(true);
    if (debounceTimeout.current) {
      window.clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      const predictions = await getLocationPrediction(e.target.value);
      if (!predictions) {
        setLoading(false);
        const notFoundArray = Array(3).fill(texts.searchInput.error);
        setLocations(notFoundArray);
        return;
      }
      const predictionsArray = predictions.map((prediction: { description: string; }) => {
        const formattedPrediction = prediction.description.split(',').splice(0, 2).join(',');

        return formattedPrediction;
      });
      setLocations(predictionsArray);
      setLoading(false);
    }, 500);
  };

  const handleChangePosition = async (location: string) => {
    // Take the coords from getGeocode service based on location name, then change map position with thats coords
    const locationCoords: Location = await getGeocode(location);

    const lat = locationCoords.lat;
    const lng = locationCoords.lng;

    newLocation(lat, lng);
    setLocations([]);
    setOptionsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const isButton = e.target instanceof HTMLButtonElement;

    // If element is not a button then clear the menu
    if (!isButton) {
      setLocations([]);
      setOptionsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (

    <>
      <div className='input-container'>
        <input
          id="autocomplete"
          className={`location-input ${optionsOpen && 'open-options'}`}
          onClick={translate}
          onChange={(e) => { handleUserSearch(e); }}
          placeholder='Buenos Aires, Cordoba...'>
        </input>
        <button
          onClick={handleClear}
          className='clear-input'
        >✖</button>
      </div>
      {
        loading &&
        <div className='options-container'>
          {[1, 2, 3].map(button => {
            return (
              <button
                key={button}
                className='option-button'
              ><ThreeDots
                height="24"
                width="24"
                color='#444'
              ></ThreeDots>
              </button>
            );
          })}
        </div>
      }
      {
        locations.length > 0 && !loading &&
        <div className='options-container'>
          {
            locations.slice(0, 3).map((location, index) => {
              return (
                <button
                  disabled={loading}
                  className='option-button'
                  key={index}
                  value={location}
                  onClick={() => { handleChangePosition(location); }}
                ><LocationIcon /> {location}
                </button>
              );
            })
          }
        </div>
      }
    </>
  );
};

interface InputFieldProps {
  translate: () => void;
}