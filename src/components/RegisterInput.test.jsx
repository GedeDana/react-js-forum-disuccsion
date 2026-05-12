/**
 *
 * scenario testing
 *  - should handle name correctly
 *  - should handle email correctly
 *  - should handle passowrd correctly
 *  - should handle confirmpassowrd correctly
 *  - should handle register function when login button is clicked
 */

import React from 'react';
import { describe, it, expect, afterEach, vi  } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

describe('Register Component', () => {
  afterEach(()=> {
    cleanup();
  });

  it('should handle name correctly', async () =>{
    render(<RegisterInput login={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Name');

    await userEvent.type(nameInput, 'name');

    expect(nameInput).toHaveValue('name');
  });


  it('should handle email correctly', async () =>{
    render(<RegisterInput login={() => {}} />);
    const usernameInput = await screen.getByPlaceholderText('Email');

    await userEvent.type(usernameInput, 'usernametest@gmail.com');

    expect(usernameInput).toHaveValue('usernametest@gmail.com');
  });


  it('should handle password typing correctly', async () => {
    render(<RegisterInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'password');

    expect(passwordInput).toHaveValue('password');
  });


  it('should handle confirm password typing correctly', async () => {
    render(<RegisterInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Confirm Password');

    await userEvent.type(passwordInput, 'password');

    expect(passwordInput).toHaveValue('password');
  });


  it('should handle register function when register button is clicked', async () => {
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);

    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'test');
    const usernameInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(usernameInput, 'usernametest@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'password');
    const confirmPasswordInput = await screen.getByPlaceholderText('Confirm Password');
    await userEvent.type(confirmPasswordInput, 'password');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    await userEvent.click(registerButton);

    expect(mockRegister).toHaveBeenCalledWith({
      name: 'test',
      email: 'usernametest@gmail.com',
      password: 'password',
      confirmPassword: 'password'
    });


  });
});

