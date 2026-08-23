import LandingNavbar from "../components/LandingNavbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import "../landing.scss";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <LandingNavbar />

      <main>
        <Hero />
        <Features />
      </main>
    </div>
  );
};

export default LandingPage;
