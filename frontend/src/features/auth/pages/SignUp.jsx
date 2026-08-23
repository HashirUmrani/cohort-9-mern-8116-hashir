import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const { loading, handleSignUp } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    if (username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");
    if (!validateForm()) {
      return;
    }

    try {
      await handleSignUp({ username, email, password });
      navigate("/login");
    } catch (err) {
      setServerError(err.message);
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

        {serverError && <p className="error-message">{serverError}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) {
                  setErrors((prev) => ({
                    ...prev,
                    username: "",
                  }));
                }
              }}
              type="text"
              id="username"
              name="username"
              placeholder="Enter a username"
              required
            />

            {errors.username && (
              <p className="field-error">{errors.username}</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => ({
                    ...prev,
                    email: "",
                  }));
                }
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              required
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => ({
                    ...prev,
                    password: "",
                  }));
                }
              }}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
            {errors.password && (
              <p className="field-error">{errors.password}</p>
            )}
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
