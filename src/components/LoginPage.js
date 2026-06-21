import { useState } from 'react';
import { login, register } from '../services/api';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    if (isRegistering && !name) {
      setError('Please enter your name');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let response;
      if (isRegistering) {
        response = await register({ name, email, password });
      } else {
        response = await login({ email, password });
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLogin(response.data.user);

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">

        <div className="login-logo">🚀</div>
        <h1>AI Career OS</h1>
        <p>{isRegistering ? 'Create your account' : 'Welcome back!'}</p>

        {isRegistering && (
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="input-group">
          <label>Email Address</label>
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

        {error && <p className="error-message">⚠️ {error}</p>}

        <button
          className="login-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Please wait...' : isRegistering ? 'Create Account' : 'Login →'}
        </button>

        <p className="toggle-auth">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }}>
            {isRegistering ? ' Login' : ' Register'}
          </span>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;