import { Link } from 'react-router-dom';
import './Hero.css';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="stars"></div>
        <div className="shooting-stars"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title fade-in-up">
            Explore the cosmos with 
            <span className="gradient-text"> STRELLA</span>
          </h1>
          <p className="hero-subtitle fade-in-up">
            Your gateway to the heavens. Experience the universe like never before 
            with our premium space tourism packages.
          </p>
          <div className="hero-buttons fade-in-up">
            <Link to="/destinations" className="btn btn-primary">
              <span>Explore Destinations</span>
            </Link>
            <Link to="/reservations" className="btn btn-secondary">
              <span>Secure Your Spot</span>
            </Link>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Successful Missions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Happy Travelers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.9</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};
