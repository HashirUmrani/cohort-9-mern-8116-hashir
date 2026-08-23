import { useNavigate } from "react-router";

const LandingNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="landing-navbar">
      <div className="landing-logo" onClick={() => navigate("/")}>
        <div className="landing-logo-icon">N</div>
        <span>NoteApp</span>
      </div>

      <div className="landing-nav-actions">
        <button
          type="button"
          className="landing-login-btn"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>

        <button
          type="button"
          className="landing-signup-btn"
          onClick={() => navigate("/signUp")}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default LandingNavbar;
