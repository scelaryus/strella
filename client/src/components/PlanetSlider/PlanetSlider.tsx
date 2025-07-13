import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { destinationsAPI } from '../../services/api';
import { SimplePlanet3D } from '../Planet3D/SimplePlanet3D';
import { ThreeJSPlanet } from '../Planet3D/ThreeJSPlanet';
import { CSS3DPlanet } from '../Planet3D/CSS3DPlanet';
import type { Destination } from '../../types';
import './PlanetSlider.css';

export const PlanetSlider = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [renderMode, setRenderMode] = useState<'2d' | 'simple3d' | 'css3d' | 'threejs'>('2d');

  // Fallback destinations in case API fails
  const fallbackDestinations: Destination[] = [
    {
      id: 1,
      name: "Mars",
      description: "The Red Planet - Experience the rugged beauty of Mars with its vast canyons and towering volcanoes.",
      price: 50000,
      duration: "6 months",
      difficulty: "Advanced",
      image: "mars.svg",
      highlights: [
        "Olympus Mons - largest volcano in the solar system",
        "Valles Marineris - massive canyon system",
        "Polar ice caps exploration"
      ],
      available: true
    },
    {
      id: 2,
      name: "Jupiter",
      description: "The Gas Giant - Witness the magnificent storms and explore the fascinating moons of Jupiter.",
      price: 75000,
      duration: "8 months",
      difficulty: "Expert",
      image: "jupiter.svg",
      highlights: [
        "Great Red Spot observation",
        "Europa moon landing",
        "Io volcanic activity viewing"
      ],
      available: true
    },
    {
      id: 3,
      name: "Saturn",
      description: "The Ringed Wonder - Marvel at Saturn's spectacular ring system and explore its mysterious moons.",
      price: 80000,
      duration: "10 months",
      difficulty: "Expert",
      image: "saturn.svg",
      highlights: [
        "Ring system flythrough",
        "Titan moon surface landing",
        "Enceladus geysers viewing"
      ],
      available: true
    },
    {
      id: 4,
      name: "Moon",
      description: "Earth's Companion - Perfect for beginners, experience low gravity and stunning Earth views.",
      price: 25000,
      duration: "2 weeks",
      difficulty: "Beginner",
      image: "moon.svg",
      highlights: [
        "Sea of Tranquility landing",
        "Earth-rise viewing",
        "Apollo landing sites tour"
      ],
      available: true
    }
  ];
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await destinationsAPI.getAll();
        if (response.success && response.data) {
          setDestinations(response.data);
        } else {
          console.warn('API returned no data, using fallback destinations');
          setDestinations(fallbackDestinations);
        }
      } catch (err) {
        console.warn('API failed, using fallback destinations:', err);
        setError('Using offline destinations');
        setDestinations(fallbackDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    if (destinations.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % destinations.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [destinations.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return '#4ade80';
      case 'advanced': return '#f59e0b';
      case 'expert': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <section className="planet-slider">
        <div className="container">
          <h2 className="section-title">Destinations</h2>
          <div className="slider-loading">
            <div className="loading-spinner"></div>
            <p>Loading amazing destinations...</p>
          </div>
        </div>
      </section>
    );
  }
  if (error && destinations.length === 0) {
    return (
      <section className="planet-slider">
        <div className="container">
          <h2 className="section-title">Destinations</h2>
          <div className="slider-error">
            <p>🚀 Preparing your space adventure...</p>
            <p>Loading destinations from our cosmic database...</p>
            <Link to="/destinations" className="btn btn-primary">
              Explore All Destinations
            </Link>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="planet-slider">
      <div className="container">        <h2 className="section-title">Popular Destinations</h2>
        <p className="section-subtitle">
          Discover breathtaking worlds beyond Earth
        </p>
        
        {error && (
          <div className="status-indicator">
            <span className="offline-badge">
              🌐 Offline Mode • Showing Sample Destinations
            </span>
          </div>
        )}        {/* 4-Mode View Toggle */}
        <div className="view-toggle-container">
          <button 
            className={`view-toggle ${renderMode === '2d' ? 'active' : ''}`}
            onClick={() => setRenderMode('2d')}
          >
            🌍 2D View
          </button>
          <button 
            className={`view-toggle ${renderMode === 'simple3d' ? 'active' : ''}`}
            onClick={() => setRenderMode('simple3d')}
          >
            🪐 Simple 3D
          </button>
          <button 
            className={`view-toggle ${renderMode === 'css3d' ? 'active' : ''}`}
            onClick={() => setRenderMode('css3d')}
          >
            ✨ CSS 3D
          </button>
          <button 
            className={`view-toggle ${renderMode === 'threejs' ? 'active' : ''}`}
            onClick={() => setRenderMode('threejs')}
          >
            🚀 Three.js
          </button>
        </div>

        {/* Render based on selected mode */}
        {renderMode === '2d' && (
          <div className="slider-container">
          <div className="slider-wrapper">
            <div 
              className="slider-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >              {destinations.map((destination) => (
                <div key={destination.id} className="slide">
                  <div className="slide-content">
                    <div className="slide-image">                      <img 
                        src={`/images/${destination.name.toLowerCase()}.svg`} 
                        alt={destination.name}
                        onError={(e) => {
                          e.currentTarget.src = '/images/default-planet.svg';
                        }}
                      />
                      <div className="slide-overlay">
                        <div className="difficulty-badge" 
                             style={{ backgroundColor: getDifficultyColor(destination.difficulty) }}>
                          {destination.difficulty}
                        </div>
                      </div>
                    </div>
                    
                    <div className="slide-info">
                      <h3 className="slide-title">{destination.name}</h3>
                      <p className="slide-description">{destination.description}</p>
                      
                      <div className="slide-details">
                        <div className="detail-item">
                          <span className="detail-label">Duration:</span>
                          <span className="detail-value">{destination.duration}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Price:</span>
                          <span className="detail-value">${destination.price.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="slide-highlights">
                        <h4>Highlights:</h4>
                        <ul>
                          {destination.highlights.slice(0, 3).map((highlight, idx) => (
                            <li key={idx}>{highlight}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="slide-actions">
                        <Link 
                          to={`/destinations?id=${destination.id}`} 
                          className="btn btn-primary"
                        >
                          Learn More
                        </Link>
                        <Link 
                          to="/reservations" 
                          className="btn btn-secondary"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="slider-btn prev" onClick={prevSlide}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>

          <button className="slider-btn next" onClick={nextSlide}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>          <div className="slider-dots">
            {destinations.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}          </div>
          </div>
        )}

        {renderMode === 'simple3d' && (
          <SimplePlanet3D 
            destinations={destinations} 
            onPlanetSelect={(destination) => {
              console.log('Planet selected in simple 3D view:', destination.name);
            }}
          />
        )}

        {renderMode === 'css3d' && (
          <CSS3DPlanet 
            destinations={destinations} 
            onPlanetSelect={(destination) => {
              console.log('Planet selected in CSS 3D view:', destination.name);
            }}
          />
        )}

        {renderMode === 'threejs' && (
          <ThreeJSPlanet 
            destinations={destinations} 
            onPlanetSelect={(destination) => {
              console.log('Planet selected in Three.js view:', destination.name);
            }}
          />
        )}
      </div>
    </section>
  );
};
