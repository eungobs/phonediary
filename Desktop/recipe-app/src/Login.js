import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      setLoading(false);
      navigate('/add-recipe'); // Ensure this matches the route in App.js
    }, 1000); // 1 second delay
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {loading ? (
        <div className="loader-container">
          <div className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <p>Logging in...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      )}
      <style jsx>{`
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          padding: 20px;
        }
        h1 {
          margin-bottom: 20px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 400px;
        }
        .login-input {
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }
        .login-button {
          padding: 10px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }
        .login-button:hover {
          background-color: #0056b3;
        }
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .loader {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .dot {
          width: 12px;
          height: 12px;
          background-color: green;
          border-radius: 50%;
          animation: bounce 1.4s infinite both;
        }
        .dot:nth-child(2) {
          animation-delay: -0.32s;
        }
        .dot:nth-child(3) {
          animation-delay: -0.16s;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-15px);
          }
          60% {
            transform: translateY(-10px);
          }
        }

        /* Responsive Styles */
        @media (max-width: 1200px) {
          .login-container {
            padding: 15px;
          }
        }

        @media (max-width: 1000px) {
          .login-container {
            padding: 10px;
          }
        }

        @media (max-width: 900px) {
          .login-form {
            max-width: 350px;
          }
        }

        @media (max-width: 740px) {
          .login-form {
            max-width: 300px;
          }
          .login-input, .login-button {
            font-size: 14px;
          }
        }

        @media (max-width: 640px) {
          .login-form {
            max-width: 280px;
          }
          .login-input, .login-button {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .login-form {
            max-width: 260px;
          }
          .login-input, .login-button {
            font-size: 12px;
          }
        }

        @media (max-width: 320px) {
          .login-form {
            max-width: 240px;
          }
          .login-input, .login-button {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
