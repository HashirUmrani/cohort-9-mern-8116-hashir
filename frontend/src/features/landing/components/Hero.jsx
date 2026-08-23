import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-hero">
      <div className="hero-content">
        <span className="hero-label">Simple note taking</span>

        <h1>
          Capture your ideas.
          <span> Keep what matters.</span>
        </h1>

        <p>
          NoteApp gives you a simple place to write, organize, and manage your
          notes without the clutter.
        </p>

        <div className="hero-actions">
          <button
            type="button"
            className="hero-primary-btn"
            onClick={() => navigate("/signUp")}
          >
            Get Started
          </button>

          <button
            type="button"
            className="hero-secondary-btn"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </div>

        <div className="hero-points">
          <span>✓ Simple to use</span>
          <span>✓ Organize your notes</span>
          <span>✓ Stay focused</span>
        </div>
      </div>

      <div className="hero-note-preview">
        <div className="preview-top">
          <div className="preview-dots">
            <span />
            <span />
            <span />
          </div>

          <span>NoteApp</span>
        </div>

        <div className="preview-title">MY NOTES</div>

        <div className="preview-note active">
          <strong>Project Ideas</strong>
          <small>Today</small>
        </div>

        <div className="preview-note">
          <strong>Meeting Notes</strong>
          <small>Yesterday</small>
        </div>

        <div className="preview-note">
          <strong>Things to learn</strong>
          <small>Aug 18</small>
        </div>
      </div>
    </section>
  );
};

export default Hero;
