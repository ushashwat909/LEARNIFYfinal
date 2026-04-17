import React from 'react';
import { useOutletContext } from 'react-router-dom';
import LoginPage from '../components/LoginPage';

export default function LoginPageRoute() {
  const { theme, handleLogin } = useOutletContext();
  return <LoginPage onLogin={handleLogin} theme={theme} />;
}
