/**
 * scenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle passowrd typing correctly
 *   - should handle login function when login button is clicked
 *
 *
 */
import React from 'react';
import { describe, it, expect, afterEach, vi  } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

describe('LoginInput Component', () => {
  afterEach(()=> {
    cleanup();
  });

  it('should handle email typing correctly', async  () => {
    render(<LoginInput login={() => {}} />);
    const usernameInput = await screen.getByPlaceholderText('Email');

    await userEvent.type(usernameInput, 'usernametest@gmail.com');

    expect(usernameInput).toHaveValue('usernametest@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'password');

    expect(passwordInput).toHaveValue('password');
  });

  it('should handle login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);

    const usernameInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(usernameInput, 'usernametest@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'password');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    await userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({
      email: 'usernametest@gmail.com',
      password: 'password'
    });


  });
});