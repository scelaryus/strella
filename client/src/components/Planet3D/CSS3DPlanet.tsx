import React, { useState, useEffect, useRef } from 'react';
import type { Destination } from '../../types';
import './SolarSystem3D.css';

interface CSS3DPlanetProps {
  destinations: Destination[];
  onPlanetSelect?: (destination: Destination) => void;
}

export const CSS3DPlanet: React.FC<CSS3DPlanetProps> = ({ 
  destinations, 
  onPlanetSelect 
}) => {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlanetClick = (destination: Destination) => {
    setSelectedPlanet(selectedPlanet === destination.id ? null : destination.id);
    onPlanetSelect?.(destination);
  };

  const getPlanetStyle = (destination: Destination, index: number) => {
    const isSelected = selectedPlanet === destination.id;
    const baseColor = getPlanetColor(destination.name);
    
    return {
      '--planet-color': baseColor,
      '--planet-glow': `${baseColor}66`,
      '--orbit-delay': `${index * -2}s`,
      '--planet-size': isSelected ? '100px' : '80px',
      transform: isSelected ? 'scale(1.2)' : 'scale(1)',
      zIndex: isSelected ? 10 : 1,
    } as React.CSSProperties;
  };

  if (isLoading) {
    return (
      <div className="solar-system-container">
        <div className="scene-info">
          <h3>🌌 Initializing CSS 3D Solar System</h3>
          <p>Preparing immersive space experience...</p>
        </div>
        
        <div className="css3d-loading">
          <div className="loading-sun"></div>
          <div className="loading-text">
            <h4>🚀 Loading Space...</h4>
            <p>Creating orbital mechanics with pure CSS</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="solar-system-container css3d-container" ref={containerRef}>
      <div className="scene-info">
        <h3>🌌 CSS 3D Solar System</h3>
        <p>Pure CSS Animation • Click planets • {destinations.length} destinations</p>
        
        <div className="controls">
          <button 
            className={`control-btn ${isAnimating ? 'active' : ''}`}
            onClick={() => setIsAnimating(!isAnimating)}
          >
            {isAnimating ? '⏸️ Pause' : '▶️ Play'}
          </button>
          <div className="speed-control">
            <label>Speed:</label>
            <input 
              type="range" 
              min="0.1" 
              max="3" 
              step="0.1" 
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>
      
      <div 
        className={`css3d-solar-system ${isAnimating ? 'animating' : 'paused'}`}
        style={{ '--rotation-speed': `${rotationSpeed}` } as React.CSSProperties}
      >
        {/* Central Sun */}
        <div className="css3d-sun">
          <div className="sun-surface"></div>
          <div className="sun-glow"></div>
          <div className="sun-corona"></div>
        </div>
        
        {/* Orbital Paths */}
        <div className="orbital-paths">
          {destinations.map((_, index) => (
            <div 
              key={`orbit-${index}`}
              className="orbit-path"
              style={{ 
                '--orbit-size': `${200 + index * 60}px`,
                '--orbit-duration': `${20 + index * 5}s`
              } as React.CSSProperties}
            />
          ))}
        </div>
        
        {/* Planets */}
        {destinations.map((destination, index) => (
          <div
            key={destination.id}
            className="css3d-orbit"
            style={{
              '--orbit-radius': `${200 + index * 60}px`,
              '--orbit-duration': `${20 + index * 5}s`,
              '--orbit-delay': `${index * -2}s`
            } as React.CSSProperties}
          >
            <div
              className={`css3d-planet ${selectedPlanet === destination.id ? 'selected' : ''}`}
              style={getPlanetStyle(destination, index)}
              onClick={() => handlePlanetClick(destination)}
            >
              <div className="planet-surface">
                <div className="surface-texture"></div>
                <div className="surface-shine"></div>
              </div>
              
              <div className="planet-atmosphere"></div>
              
              <div className="planet-info">
                <div className="planet-name">{destination.name}</div>
                <div className="planet-price">${destination.price.toLocaleString()}</div>
              </div>
              
              {/* Saturn's Rings */}
              {destination.name.toLowerCase() === 'saturn' && (
                <div className="saturn-ring-system">
                  <div className="saturn-ring ring-1"></div>
                  <div className="saturn-ring ring-2"></div>
                  <div className="saturn-ring ring-3"></div>
                </div>
              )}
              
              {/* Selection Indicator */}
              {selectedPlanet === destination.id && (
                <div className="selection-indicator">
                  <div className="selection-ring"></div>
                  <div className="selection-pulse"></div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Background Stars */}
        <div className="star-field">
          {Array.from({ length: 100 }, (_, i) => (
            <div 
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                '--star-size': `${Math.random() * 3 + 1}px`
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
      
      {/* Planet Details Panel */}
      {selectedPlanet && (
        <div className="planet-details enhanced">
          {(() => {
            const planet = destinations.find(d => d.id === selectedPlanet);
            if (!planet) return null;
            
            return (
              <div className="planet-info-card css3d-card">
                <div className="card-header">
                  <h4>🪐 {planet.name}</h4>
                  <button 
                    className="close-btn"
                    onClick={() => setSelectedPlanet(null)}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="card-content">
                  <p className="planet-description">{planet.description}</p>
                  
                  <div className="planet-stats">
                    <div className="stat-item">
                      <span className="stat-icon">⏱️</span>
                      <span className="stat-label">Duration:</span>
                      <span className="stat-value">{planet.duration}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-icon">💰</span>
                      <span className="stat-label">Price:</span>
                      <span className="stat-value">${planet.price.toLocaleString()}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-icon">🎯</span>
                      <span className="stat-label">Difficulty:</span>
                      <span className="stat-value">{planet.difficulty}</span>
                    </div>
                  </div>
                  
                  <div className="planet-highlights">
                    <h5>✨ Highlights:</h5>
                    <ul>
                      {planet.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="planet-actions">
                    <button className="btn btn-primary btn-sm">
                      🚀 Learn More
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      📅 Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
      
      {/* Technology Badge */}
      <div className="tech-badge">
        <span>⚡ Pure CSS 3D</span>
        <span>No WebGL Required</span>
      </div>
    </div>
  );
};

const getPlanetColor = (name: string): string => {
  switch (name.toLowerCase()) {
    case 'mars': return '#e74c3c';
    case 'jupiter': return '#f39c12';
    case 'saturn': return '#f1c40f';
    case 'moon': return '#ecf0f1';
    default: return '#667eea';
  }
};
