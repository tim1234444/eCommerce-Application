import './LoginForm.css';
import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import { useNavigate } from 'react-router-dom';
import fetchAccessToken from '../../api/getToken';
import getCustomer from '../../api/getCustomer';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length === 0) return 'Введите email.';
    if (!trimmed.includes('@')) return 'Email должен содержать символ «@».';
    const [, domain] = trimmed.split('@');
    if (!domain || !domain.includes('.'))
      return 'Email должен содержать доменное имя.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
      return 'Неверный формат email.';
    return '';
  };

  const validatePassword = (value: string) => {
    const trimmed = value.trim();
    if (trimmed.length === 0) return 'Введите пароль.';
    if (value !== trimmed)
      return 'Пароль не должен содержать пробелов в начале/конце.';
    if (trimmed.length < 8) return 'Пароль должен быть не менее 8 символов.';
    if (!/[A-Z]/.test(trimmed))
      return 'Пароль должен содержать заглавную букву.';
    if (!/[a-z]/.test(trimmed))
      return 'Пароль должен содержать строчную букву.';
    if (!/[0-9]/.test(trimmed)) return 'Пароль должен содержать цифру.';
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (!emailErr && !passwordErr) {
      const data = fetchAccessToken(email, password, setErrorMessage);
      data.then((data) => {
        console.log(data);
        document.cookie = `access_token=${data.access_token};max-age=172800`;
        getCustomer(email).then((data) =>
          localStorage.setItem('customerId', `${data.results[0].id}`),
        );
        if (!data.error) {
          navigate('/', { replace: true });
        }
      });
    }
  };

  return (
    <form className="authorisation-form" onSubmit={handleSubmit} noValidate>
      <InputField
        label="Email: "
        type="email"
        value={email}
        onChange={setEmail}
        error={emailError}
        onValidate={() => setEmailError(validateEmail(email))}
      />

      <InputField
        label="Password: "
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={setPassword}
        error={passwordError}
        onValidate={() => setPasswordError(validatePassword(password))}
      />
      {errorMessage && <div className="error-message">⚠️ {errorMessage}</div>}

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword((v) => !v)}
        />
        Show password
      </label>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
