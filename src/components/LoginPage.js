import './LoginPage.css';
function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">

        <h1>AI Career OS</h1>
        <p>Your personal career dashboard</p>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>

        <button className="login-button">Login</button>

      </div>
    </div>
  );
}

export default LoginPage;