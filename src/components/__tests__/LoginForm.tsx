import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from 'components/LoginForm';

describe('Login', () => {
  test('validate login email/password', async () => {
    const onSubmit = jest.fn();
    const { getByText, getByLabelText } = render(
      <LoginForm onSubmit={onSubmit} />,
    );
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });

    fireEvent.submit(passwordInput);

    expect(getByText('Invalid email')).toBeInTheDocument();
    expect(getByText('Invalid password')).toBeInTheDocument();
  });

  test('submit login', async () => {
    const onSubmit = jest.fn();
    const { getByLabelText } = render(<LoginForm onSubmit={onSubmit} />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'email@domain.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Aa11%$cccc' } });

    fireEvent.submit(passwordInput);

    expect(onSubmit).toHaveBeenCalled();
  });
});
