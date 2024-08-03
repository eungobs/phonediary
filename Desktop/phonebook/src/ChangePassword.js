import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './change-password.css';

function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (formData.newPassword !== formData.confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    // Here you would typically send the formData to the server to update the password
    // For the purpose of this example, we'll just simulate a successful password change

    alert('Password changed successfully!');
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="change-password">
      <h2>Change Password</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
