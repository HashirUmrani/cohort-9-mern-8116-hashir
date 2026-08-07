import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleSignUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignUp({ username, email, password });
      navigate("/");
    } catch (err) {
      console.error("SignUp failed", err);
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
        <h1>Create Account</h1>
        <p>Join us and start organizing your notes today.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              id="username"
              name="username"
              placeholder="Enter a username"
              required
            />
          </div>
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
            {loading ? "SignUp...." : "SignUP"}
          </button>
        </form>

        <p>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
