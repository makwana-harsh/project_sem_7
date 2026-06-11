import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { registerUser } from '../api/auth.api';

export function useAuthActions() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setError('');
    setLoading(true);
    try {
      const data = await login(credentials);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setError('');
    setLoading(true);
    try {
      const data = await registerUser(userData);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, handleLogin, handleRegister, setError };
}