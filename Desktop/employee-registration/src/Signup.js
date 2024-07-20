import React from 'react';
import './Signup.css';

function Signup({ navigate }) {
  return (
    <div className="signup">
      <h1>Signup</h1>
      <input type="text" placeholder=" name" />
      <input type="text" placeholder="surname" />
      <input type="text" placeholder="id number" />
      <input type="text" placeholder="work-id" />
      <input type="text" placeholder="position" />
      <input type="password" placeholder="password" />
      <input type="confirm password" placeholder="confirm password" />
      <button onClick={() => navigate('login')}>Signup</button>
      <button onClick={() => navigate('login')}>Already have an account? Log in.</button>
    </div>
  );
}

export default Signup;
