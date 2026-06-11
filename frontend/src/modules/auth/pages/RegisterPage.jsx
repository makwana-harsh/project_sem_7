import React, { useState } from 'react';
import AuthInput from '../components/AuthInput';
import { useAuthActions } from '../hooks/useAuthActions';

function RegisterPage() {
  // All state inputs for your requested fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Use our simple custom hook for error management and submission
  const { error, loading, handleRegister, setError } = useAuthActions();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simply check if passwords match before hitting the server
    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      const data = await handleRegister({
        firstName,
        lastName,
        userName,
        email,
        password
      });
      alert(data.message || "Registration Successful!");
      window.location.href = '/login';
    } catch (err) {
      // Error is already handled by our hook!
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Create an Account</h1>
      
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <AuthInput label="First Name" value={firstName} onChange={setFirstName} />
        <AuthInput label="Last Name" value={lastName} onChange={setLastName} />
        <AuthInput label="Username" value={userName} onChange={setUserName} minLength={3} />
        <AuthInput label="Email Address" type="email" value={email} onChange={setEmail} />
        <AuthInput label="Password" type="password" value={password} onChange={setPassword} minLength={6} />
        <AuthInput label="Confirm Password" type="password" value={confirmPassword} onChange={setConfirmPassword} minLength={6} />
        
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {loading ? 'Registering...' : 'Submit'}
        </button>
      </form>
      
      <p style={{ marginTop: '15px' }}>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}

export default RegisterPage;