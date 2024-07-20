import React from 'react';
import './Login.css';

function Login({ navigate }) {
  return (
    <div className="login">
      <button
        className="signup-link"
        onClick={() => navigate('signup')}
      >
        Signup
      </button>
      <h1>mlab</h1>
      <input type="text" placeholder="user name" />
      <input type="password" placeholder="password" />
      <button onClick={() => navigate('active-employees')}>Login</button>
      <div className="links">
        <button onClick={() => alert('Change password functionality')}>Change password?</button>
        <button onClick={() => alert('Forgot password functionality')}>forgot password?</button>
      </div>
    </div>
  );
}

export default Login;