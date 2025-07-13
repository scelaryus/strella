import React, { useState, useEffect, useRef } from 'react';
import type { Destination } from '../../types';
import './SolarSystem3D.css';

interface SimplePlanet3DProps {
  destinations: Destination[];
  onPlanetSelect?: (destination: Destination) => void;
}

export const SimplePlanet3D: React.FC<SimplePlanet3DProps> = ({ 
  destinations, 
  onPlanetSelect 
}) => {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading time for 3D scene
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handlePlanetClick = (destination: Destination) => {
    setSelectedPlanet(selectedPlanet === destination.id ? null : destination.id);
    onPlanetSelect?.(destination);
  };

  const getPlanetPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total;
    const radius = 120; // Reduced radius for better mobile experience
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  // Handle case where destinations failed to load
  if (!destinations || destinations.length === 0) {
    return (
      <div className="solar-system-container">
        <div className="scene-info">
          <h3>🌌 3D Solar System</h3>
          <p>Loading destinations...</p>
        </div>
        
        <div className="api-error-fallback">
          <div className="error-content">
            <h3>🚀 Destinations Loading...</h3>
            <p>We're preparing your cosmic adventure destinations!</p>
            <div className="loading-animation">
              <div className="planet-loading mars"></div>
              <div className="planet-loading jupiter"></div>
              <div className="planet-loading saturn"></div>
              <div className="planet-loading moon"></div>
            </div>
            <p className="fallback-text">
              If destinations don't load, our backend server might be starting up.
              <br />
              <strong>Fallback destinations are being prepared...</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="solar-system-container">
        <div className="scene-info">
          <h3>🌌 Initializing 3D View</h3>
          <p>Preparing your space adventure...</p>
        </div>
        
        <div className="loading-3d">
          <div className="loading-spinner-3d"></div>
          <p>Loading 3D Solar System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="solar-system-container" ref={containerRef}>
      <div className="scene-info">
        <h3>🌌 Interactive Solar System</h3>
        <p>Click planets to explore • {destinations.length} destinations available</p>
      </div>
      
      <div className="simple-3d-scene">
        {/* Central Sun */}
        <div className="central-sun">
          <div className="sun-core"></div>
          <div className="sun-glow"></div>
        </div>
        
        {/* Orbiting Planets */}
        {destinations.map((destination, index) => {
          const position = getPlanetPosition(index, destinations.length);
          const isSelected = selectedPlanet === destination.id;
          
          return (
            <div
              key={destination.id}
              className={`simple-planet ${isSelected ? 'selected' : ''}`}
              style={{
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
                backgroundColor: getPlanetColor(destination.name),
                animationDelay: `${index * 0.5}s`,
                transform: `translate(-50%, -50%) ${isSelected ? 'scale(1.3)' : 'scale(1)'}`
              }}
              onClick={() => handlePlanetClick(destination)}
              title={`${destination.name} - $${destination.price.toLocaleString()}`}
            >
              <div className="planet-surface">
                <div className="planet-name">{destination.name}</div>
                <div className="planet-price">${destination.price.toLocaleString()}</div>
                <div className="planet-difficulty">{destination.difficulty}</div>
              </div>
              
              {/* Saturn's rings */}
              {destination.name.toLowerCase() === 'saturn' && (
                <div className="saturn-rings">
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                </div>
              )}
              
              {/* Selection indicator */}
              {isSelected && (
                <div className="selection-ring"></div>
              )}
            </div>
          );
        })}
        
        {/* Orbital paths */}
        <div className="orbit-paths">
          <div className="orbit-path"></div>
        </div>
      </div>
      
      {/* Planet Details Panel */}
      {selectedPlanet && (
        <div className="planet-details">
          {(() => {
            const planet = destinations.find(d => d.id === selectedPlanet);
            if (!planet) return null;
            
            return (
              <div className="planet-info-card">
                <h4>🪐 {planet.name}</h4>
                <p>{planet.description}</p>
                <div className="planet-stats">
                  <span className="stat">
                    <strong>Duration:</strong> {planet.duration}
                  </span>
                  <span className="stat">
                    <strong>Price:</strong> ${planet.price.toLocaleString()}
                  </span>
                  <span className="stat">
                    <strong>Difficulty:</strong> {planet.difficulty}
                  </span>
                </div>
                <div className="planet-highlights">
                  <strong>Highlights:</strong>
                  <ul>
                    {planet.highlights.slice(0, 3).map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="planet-actions">
                  <button className="btn btn-primary btn-sm">
                    Learn More
                  </button>
                  <button className="btn btn-secondary btn-sm">
                    Book Now
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
      
      {/* Future Three.js Teaser */}
      <div className="threejs-teaser">
        <div className="teaser-content">
          <h4>🚀 Full 3D Experience Coming Soon!</h4>
          <p>Enhanced with Three.js for realistic planet rendering</p>
          <div className="features-preview">
            <span>🌍 Realistic Textures</span>
            <span>🌌 Particle Effects</span>
            <span>🎮 VR Support</span>
          </div>
        </div>
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
