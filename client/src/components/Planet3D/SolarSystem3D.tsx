import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { Planet3D } from './Planet3D';
import type { Destination } from '../../types';
import './SolarSystem3D.css';

interface SolarSystem3DProps {
  destinations: Destination[];
  onPlanetSelect?: (destination: Destination) => void;
}

const CameraControls = () => (
  <OrbitControls
    enablePan={true}
    enableZoom={true}
    enableRotate={true}
    zoomSpeed={0.6}
    panSpeed={0.5}
    rotateSpeed={0.4}
    minDistance={5}
    maxDistance={30}
    minPolarAngle={Math.PI / 6}
    maxPolarAngle={Math.PI - Math.PI / 6}
  />
);

const SceneLighting = () => (
  <>
    {/* Main sun light */}
    <directionalLight
      position={[10, 10, 5]}
      intensity={1}
      color="#ffeb3b"
      castShadow
    />
    
    {/* Fill light */}
    <ambientLight intensity={0.3} color="#404040" />
    
    {/* Rim light */}
    <directionalLight
      position={[-5, 5, -5]}
      intensity={0.5}
      color="#81c784"
    />
  </>
);

const LoadingFallback = () => (
  <div className="loading-3d">
    <div className="loading-spinner-3d"></div>
    <p>Loading 3D Solar System...</p>
  </div>
);

export const SolarSystem3D = ({ destinations, onPlanetSelect }: SolarSystem3DProps) => {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);

  const handlePlanetClick = (destination: Destination) => {
    setSelectedPlanet(selectedPlanet === destination.id ? null : destination.id);
    onPlanetSelect?.(destination);
  };

  const getPlanetPosition = (index: number): [number, number, number] => {
    const angle = (index * 2 * Math.PI) / destinations.length;
    const radius = 8;
    return [
      Math.cos(angle) * radius,
      Math.sin(index * 0.5) * 2, // Vary height for visual interest
      Math.sin(angle) * radius
    ];
  };

  return (
    <div className="solar-system-container">
      <div className="scene-info">
        <h3>Interactive Solar System</h3>
        <p>Click and drag to explore • Scroll to zoom • Click planets for details</p>
      </div>
      
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 5, 15], fov: 60 }}
          shadows
          className="threejs-canvas"
        >
          <Suspense fallback={null}>
            {/* Scene Environment */}
            <Environment preset="night" />
            <Stars radius={300} depth={60} count={20000} factor={7} />
            
            {/* Lighting */}
            <SceneLighting />
            
            {/* Camera Controls */}
            <CameraControls />
            
            {/* Planets */}
            {destinations.map((destination, index) => (
              <Planet3D
                key={destination.id}
                destination={destination}
                position={getPlanetPosition(index)}
                onClick={() => handlePlanetClick(destination)}
                isSelected={selectedPlanet === destination.id}
              />
            ))}
            
            {/* Central Sun */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshBasicMaterial 
                color="#ffeb3b" 
                emissive="#ff9800"
                emissiveIntensity={0.5}
              />
            </mesh>
          </Suspense>
        </Canvas>
      </div>
      
      {selectedPlanet && (
        <div className="planet-details">
          {(() => {
            const planet = destinations.find(d => d.id === selectedPlanet);
            if (!planet) return null;
            
            return (
              <div className="planet-info-card">
                <h4>{planet.name}</h4>
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
    </div>
  );
};
