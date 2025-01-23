import React, { useState } from 'react';
import './LoginPage.css'; // Importing the external CSS file
import api from "../../api";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  //   const [error, setError] = useState("")


  const userInfo = { username, password }

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true)

    api.post("token/", userInfo)
      .then(res => {
        console.log(res.data)
        localStorage.setItem("access", res.data.access)
        localStorage.setItem("refresh", res.data.refresh)
        setUsername("")
        setPassword("")
        setLoading(false)
        // setError("")
        const from = location.state.from.pathname || "/";
        navigate(from, { replace: true });
        console.log(from);
        

      })
      .catch(err => {
        console.log(err.message)
        // setError(err.message)
        setLoading(false)
      })
  };

  return (
    <div className="login-container">
      <div className="form-container">
        {/* {error && <Error error={error}/>} */}
        <h2 className="title">Login</h2>
        <form onSubmit={handleLogin} className="form">
          <div className="input-group">
            <label htmlFor="username" className="label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder='Enter your username'
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="forgot-password">
            <a href="/forgot-password" className="link">Forgot Password?</a>
          </div>
          <button type="submit" className="button" >Login</button>
        </form>
        <div className="signup">
          <p>
            Don’t have an account? <a href="/signup" className="link">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
