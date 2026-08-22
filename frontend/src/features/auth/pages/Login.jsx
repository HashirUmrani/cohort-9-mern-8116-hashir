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
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      await handleLogin({ email, password });
      navigate("/dashboard");
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
        <h1>Welcome Note</h1>
        <p>Login to continue managing your notes.</p>

        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>

          <button className="button primary-button" disabled={loading}>
            {loading ? "Logging..." : "Login"}
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
