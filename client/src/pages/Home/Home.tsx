import { Hero } from '../../components/Hero/Hero';
import { PlanetSlider } from '../../components/PlanetSlider/PlanetSlider';
import './Home.css';

export const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <PlanetSlider />
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Strella?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Advanced Technology</h3>
              <p>State-of-the-art spacecraft with the latest safety features and comfort amenities.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🚀</div>
              <h3>Expert Crew</h3>
              <p>Highly trained astronauts and space tourism specialists guide every journey.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Safety First</h3>
              <p>Rigorous safety protocols and emergency procedures ensure your peace of mind.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Luxury Experience</h3>
              <p>Premium accommodations and personalized service throughout your cosmic adventure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready for Your Space Adventure?</h2>
            <p>Join thousands of satisfied space travelers who have experienced the cosmos with Strella.</p>
            <div className="cta-buttons">
              <a href="/reservations" className="btn btn-primary">Book Your Journey</a>
              <a href="/destinations" className="btn btn-secondary">Explore Destinations</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
