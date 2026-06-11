import React from 'react';

// A simple reusable input box
function AuthInput({ label, type = 'text', value, onChange, required = true, minLength }) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ fontWeight: 'bold' }}>{label}</label>
      <br />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
      />
    </div>
  );
}

export default AuthInput;