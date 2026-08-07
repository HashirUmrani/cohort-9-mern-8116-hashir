import React, { useState } from "react";
import "../auth.form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <main className="loading-page">
        <div className="loader-container">
          <div className="spinner"></div>

          <h1>
            Loading<span>...</span>
          </h1>

          <p>Preparing your experience</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Welcome Back</h1>
        <p>LogIn to continue managing your notes.</p>

        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>

          <button className="button primary-button" disabled={loading}>
            {loading ? "LoginIn..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account? <Link to={"/signUp"}>SignUp</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
