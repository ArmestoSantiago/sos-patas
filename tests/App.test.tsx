import { expect, describe, test } from 'vitest';
import { ListContainer } from '../src/components/MenuPanel/ListContainer';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { PetsCondition, PetsType } from '../src/types/petsTypes.d';

const petExample = [{
  id: crypto.randomUUID(),
  lat: -33.738186564405446,
  lng: -61.97131547743373,
  type: PetsType.DOG,
  condition: PetsCondition.HEALTHY,
  description: 'amable',
  imgSrc: 'https://imgs.search.brave.com/kClCpuOhhu73I7w2G2D105QjJh5wmsMQTD3POuaSB8Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vc2xpZGVz/Lzg4YjE5Mzk0YzA0/NjRjNDU4ZWQ0Yzll/ODdmZGMyY2U5Lndl/YnA'
},
{
  id: crypto.randomUUID(),
  lat: -33.738186564405446,
  lng: -61.97131547743373,
  type: PetsType.DOG,
  condition: PetsCondition.HEALTHY,
  description: 'amable',
  imgSrc: 'https://imgs.search.brave.com/kClCpuOhhu73I7w2G2D105QjJh5wmsMQTD3POuaSB8Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vc2xpZGVz/Lzg4YjE5Mzk0YzA0/NjRjNDU4ZWQ0Yzll/ODdmZGMyY2U5Lndl/YnA'
}];

const createFetchResponse = (data) => {
  return data;
};

describe('<MenuPanel />', async () => {
  test('List Container should render the same amount of pets from data', async () => {
    const pets = await createFetchResponse(petExample);
    render(<ListContainer pets={pets} />);
    const articles = screen.getAllByRole('article');

    expect(articles.length).toBe(pets.length);
  });

});