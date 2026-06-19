import { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    if (email === '' || password === '') {
      setError('Please enter both email and password');
      return;
    }
    onLogin();
  }

  return (
    <div className="login-container">
      <div className="login-box">

        <h1>AI Career OS</h1>
        <p>Your personal career dashboard</p>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="login-button" onClick={handleLogin}>Login</button>

      </div>
    </div>
  );
}

export default LoginPage;