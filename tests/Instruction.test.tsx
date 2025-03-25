import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { FirstTimeInstruction } from '../src/components/FirstTimeInstructions/FirstTimeInstructions';
import { useTextsStore } from '@/stores/texts';

vi.mock('zustand', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    create: vi.fn((fn) => {
      return fn(() => mockStore);
    }),
  };
});

const mockStore = {
  texts: {
    instructions: {
      instructions0: {
        'header': 'Welcome',
        'description': 'SOS Patas is a space where we can all help lost or abandoned animals find a home. Just mark the animal\'s location on the map, and it will appear in the list of pets that need to be rescued!'
      },
      instructions1: {
        'header': 'Activate your location for a better experience!',
        'description': 'If you rejected it and want to activate it, click on the location button, accept, and reload the page.'
      },
      instructions2: {
        header: '',
        description: 'To add a lost animal or one you think needs help, click on the add button, select the location where you last saw it, and complete the form.'
      },
      instructions3: {
        header: 'That\'s it!',
        description: 'To continue, choose to sign in with your Google account or proceed as a guest. If you continue as a guest, all the animals you add will only be visible to you, and their photos will be generated by default.'
      },
      buttons: {
        guest: 'Continue as a guest',
        next: 'Next'
      }
    },
  }
};

vi.mock('@/stores/texts', () => ({
  useTextsStore: vi.fn((selector) => selector(mockStore)),
}));

describe('FirstTimeInstructions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('Should render proper text', () => {
    render(<FirstTimeInstruction />);
    const text = screen.getAllByText('SOS Patas is a space where we can all help lost or abandoned animals find a home. Just mark the animal\'s location on the map, and it will appear in the list of pets that need to be rescued!');
    expect(text).not.toBeNull();

  });

  it('Button Should work and go to the next intruction', () => {
    render(<FirstTimeInstruction />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('If you rejected it and want to activate it, click on the location button, accept, and reload the page.')).toBeTruthy();

    const button2 = screen.getByRole('button');
    fireEvent.click(button2);
    expect(screen.getByText('To add a lost animal or one you think needs help, click on the add button, select the location where you last saw it, and complete the form.')).toBeTruthy();

  });
});
