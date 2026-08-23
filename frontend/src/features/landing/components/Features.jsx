const Features = () => {
  return (
    <section className="landing-features">
      <div className="features-heading">
        <span>WHY NOTEAPP</span>

        <h2>
          Everything you need
          <br />
          to stay organized.
        </h2>

        <p>
          A simple note-taking experience built around writing, organization,
          and productivity.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">✎</div>

          <h3>Write</h3>

          <p>Create clean notes with a simple rich-text editor.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⌕</div>

          <h3>Organize</h3>

          <p>Keep your notes together and easy to manage.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">✓</div>

          <h3>Stay focused</h3>

          <p>Keep your ideas in one simple workspace.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
