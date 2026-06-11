import React, { useState } from 'react';
import AuthInput from '../components/AuthInput';
import { useAuthActions } from '../hooks/useAuthActions';

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  
  const { error, loading, handleLogin } = useAuthActions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await handleLogin({ userName, password });
      alert(data.message);
      window.location.href = '/'; 
    } catch (err) {
      // Hook captures server errors automatically
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login</h1>
      
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <AuthInput label="Username" value={userName} onChange={setUserName} minLength={3} />
        <AuthInput label="Password" type="password" value={password} onChange={setPassword} minLength={3} />
        
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {loading ? 'Logging in...' : 'Submit'}
        </button>
      </form>
      
      <p style={{ marginTop: '15px' }}>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}

export default LoginPage;