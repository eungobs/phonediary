import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgot-password.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate sending a password reset email
    try {
      // Replace with your actual password reset logic
      setTimeout(() => {
        setMessage('Password reset link has been sent to your email.');
      }, 1000);
    } catch (error) {
      setError('Failed to send password reset email.');
    }
  };

  return (
    <div className="forgot-password-container">
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      <button onClick={() => navigate('/login')} className="link">Back to Login</button>
    </div>
  );
}

export default ForgotPassword;
