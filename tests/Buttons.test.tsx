import { describe, test, vi } from 'vitest';
import React from 'react';
import { GoogleLoginButton } from '../src/components/buttons/GoogleLoginButton/GoogleLoginButton';
import { render, screen } from '@testing-library/react';
import TEXT_ES from '../src/assets/texts/TEXTS_EN.json';

vi.mock('../../../stores/texts', async () => ({
  useTextsStore: vi.fn(() => ({
    texts: TEXT_ES
  }))
}));

describe('<GoogleLoginButton />', () => {
  test('Button should render', () => {

    render(<GoogleLoginButton method={true} />);
    screen.debug();
  });
});