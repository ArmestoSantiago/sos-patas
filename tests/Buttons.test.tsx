import { describe, expect, test, vi } from 'vitest';
import React from 'react';
import { GoogleLoginButton } from '../src/components/buttons/GoogleLoginButton/GoogleLoginButton';
import { render, screen } from '@testing-library/react';
import TEXT_ES from '../src/assets/texts/TEXTS_EN.json';

vi.mock('../../../stores/texts', async () => ({
  useTextsStore: vi.fn(() => ({
    texts: TEXT_ES
  }))
}));

describe('<GoogleLoginButton />', async () => {
  test('Button should render', async () => {

    render(<GoogleLoginButton method={true} />);
    const loginButton = await screen.findByText('Log in with Google');

    expect(loginButton).toBeDefined();
  });
});