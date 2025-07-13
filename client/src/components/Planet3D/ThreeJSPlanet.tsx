import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import type { Destination } from '../../types';
import './SolarSystem3D.css';

interface ThreeJSPlanetProps {
  destinations: Destination[];
  onPlanetSelect?: (destination: Destination) => void;
}

export const ThreeJSPlanet: React.FC<ThreeJSPlanetProps> = ({ 
  destinations, 
  onPlanetSelect 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);
  const [isThreeJSSupported, setIsThreeJSSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const planetsRef = useRef<any[]>([]);  useEffect(() => {
    // Check if WebGL is supported
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setIsThreeJSSupported(false);
      setIsLoading(false);
      return;
    }

    // Initialize Three.js scene with maximum performance optimizations
    const initThreeJS = async () => {
      try {
        if (!mountRef.current) return;

        console.log('🚀 Fast-loading Three.js scene...');

        // Scene setup with minimal overhead
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a0a);
        scene.fog = null; // Disable fog for performance
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
          75,
          mountRef.current.clientWidth / mountRef.current.clientHeight,
          0.1,
          1000
        );
        camera.position.z = 15;
        camera.position.y = 5;        // Renderer setup - maximum performance mode
        const renderer = new THREE.WebGLRenderer({ 
          antialias: false, // Disabled for speed
          alpha: true,
          powerPreference: "high-performance",
          precision: "lowp", // Low precision for speed
          logarithmicDepthBuffer: false // Disabled for speed
        });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.shadowMap.enabled = false; // No shadows
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Limit pixel ratio
        renderer.sortObjects = false; // Disable object sorting for speed
        rendererRef.current = renderer;
        mountRef.current.appendChild(renderer.domElement);

        console.log('⚡ High-performance WebGL renderer ready');        // Minimal lighting for maximum performance
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = false;
        scene.add(directionalLight);

        console.log('💡 Minimal lighting system active');        // Ultra-simplified central Sun
        const sunGeometry = new THREE.SphereGeometry(0.8, 12, 12); // Even more reduced
        const sunMaterial = new THREE.MeshBasicMaterial({ 
          color: 0xffeb3b
        });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        // Simplified sun glow
        const sunGlowGeometry = new THREE.SphereGeometry(1.2, 8, 8); // Minimal geometry
        const sunGlowMaterial = new THREE.MeshBasicMaterial({
          color: 0xffeb3b,
          transparent: true,
          opacity: 0.3
        });
        const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
        scene.add(sunGlow);

        console.log('☀️ Minimal sun created in', Date.now() - performance.now(), 'ms');        // Create planets with ultra-optimized geometry
        const planets: any[] = [];
        const startTime = performance.now();
        console.log('🪐 Creating optimized planets...');
        
        destinations.forEach((destination, index) => {
          const angle = (index * 2 * Math.PI) / destinations.length;
          const radius = 8;
          
          // Minimal planet geometry for speed
          const planetGeometry = new THREE.SphereGeometry(0.8, 12, 12); // Further reduced
          const planetMaterial = new THREE.MeshBasicMaterial({ 
            color: getPlanetColor(destination.name)
          });
          
          const planet = new THREE.Mesh(planetGeometry, planetMaterial);
          planet.position.set(
            Math.cos(angle) * radius,
            Math.sin(index * 0.5) * 2,
            Math.sin(angle) * radius
          );
          
          planet.userData = { destination, index };
          
          // Minimal atmospheric glow
          const glowGeometry = new THREE.SphereGeometry(0.9, 8, 8); // Ultra-minimal
          const glowMaterial = new THREE.MeshBasicMaterial({
            color: getPlanetColor(destination.name),
            transparent: true,
            opacity: 0.2
          });
          const glow = new THREE.Mesh(glowGeometry, glowMaterial);
          glow.position.copy(planet.position);
          
          scene.add(planet);
          scene.add(glow);
          planets.push({ planet, glow, destination });

          // Saturn's rings - ultra-simplified
          if (destination.name.toLowerCase() === 'saturn') {
            const ringGeometry = new THREE.RingGeometry(1.2, 1.8, 8); // Minimal segments
            const ringMaterial = new THREE.MeshBasicMaterial({
              color: 0xffd700,
              transparent: true,
              opacity: 0.6,
              side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.copy(planet.position);
            ring.rotation.x = Math.PI / 2;
            scene.add(ring);
          }
        });

        console.log(`🚀 ${destinations.length} planets created in ${(performance.now() - startTime).toFixed(1)}ms`);
        
        planetsRef.current = planets;

        // Mouse interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseClick = (event: MouseEvent) => {
          const rect = renderer.domElement.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(
            planets.map(p => p.planet)
          );

          if (intersects.length > 0) {
            const clickedPlanet = intersects[0].object;
            const destination = clickedPlanet.userData.destination;
            setSelectedPlanet(destination.id);
            onPlanetSelect?.(destination);
          }
        };

        renderer.domElement.addEventListener('click', onMouseClick);

        // Simple orbit controls (manual implementation)
        let isMouseDown = false;
        let mouseX = 0;
        let mouseY = 0;

        const onMouseDown = (event: MouseEvent) => {
          isMouseDown = true;
          mouseX = event.clientX;
          mouseY = event.clientY;
        };

        const onMouseMove = (event: MouseEvent) => {
          if (!isMouseDown) return;
          
          const deltaX = event.clientX - mouseX;
          const deltaY = event.clientY - mouseY;
          
          camera.position.x += deltaX * 0.01;
          camera.position.y += deltaY * 0.01;
          camera.lookAt(0, 0, 0);
          
          mouseX = event.clientX;
          mouseY = event.clientY;
        };

        const onMouseUp = () => {
          isMouseDown = false;
        };

        const onWheel = (event: WheelEvent) => {
          camera.position.z += event.deltaY * 0.01;
          camera.position.z = Math.max(5, Math.min(30, camera.position.z));
        };

        renderer.domElement.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('mouseup', onMouseUp);
        renderer.domElement.addEventListener('wheel', onWheel);        // High-performance animation loop with FPS monitoring
        let frameCount = 0;
        let lastTime = performance.now();
        
        const animate = () => {
          requestAnimationFrame(animate);
          
          frameCount++;
          const currentTime = performance.now();
          
          // FPS monitoring every 60 frames
          if (frameCount % 60 === 0) {
            const fps = 60000 / (currentTime - lastTime);
            if (fps < 30) {
              console.warn(`⚠️ Low FPS detected: ${fps.toFixed(1)}`);
            }
            lastTime = currentTime;
          }

          // Optimized rotations with reduced frequency
          if (frameCount % 2 === 0) { // Update every other frame
            sun.rotation.y += 0.005; // Reduced rotation speed
            sunGlow.rotation.y -= 0.0025;
          }

          // Optimized planetary motion
          const time = currentTime * 0.0003; // Reduced time factor
          planets.forEach((planetObj, index) => {
            if (frameCount % 3 === 0) { // Update every 3rd frame
              planetObj.planet.rotation.y += 0.01;
              planetObj.glow.rotation.y += 0.01;
            }
            
            // Simplified orbital calculation
            const angle = (index * 2 * Math.PI) / destinations.length + time * 0.3;
            const radius = 8;
            
            planetObj.planet.position.x = Math.cos(angle) * radius;
            planetObj.planet.position.z = Math.sin(angle) * radius;
            planetObj.glow.position.copy(planetObj.planet.position);
          });

          // Optimized selection highlighting
          if (frameCount % 5 === 0) { // Update every 5th frame
            planets.forEach((planetObj) => {
              const isSelected = planetObj.destination.id === selectedPlanet;
              planetObj.glow.material.opacity = isSelected ? 0.5 : 0.2;
              planetObj.planet.scale.setScalar(isSelected ? 1.2 : 1);
            });
          }

          renderer.render(scene, camera);
        };        animate();
        
        const totalTime = performance.now() - startTime;
        console.log(`🎯 Three.js scene ready in ${totalTime.toFixed(1)}ms`);
        setIsLoading(false);

        // Handle resize
        const handleResize = () => {
          if (!mountRef.current) return;
          
          camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
          window.removeEventListener('resize', handleResize);
          renderer.domElement.removeEventListener('click', onMouseClick);
          renderer.domElement.removeEventListener('mousedown', onMouseDown);
          renderer.domElement.removeEventListener('mousemove', onMouseMove);
          renderer.domElement.removeEventListener('mouseup', onMouseUp);
          renderer.domElement.removeEventListener('wheel', onWheel);
          
          if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
          }
          renderer.dispose();
        };      } catch (error) {
        console.warn('Three.js failed to initialize:', error);
        setIsThreeJSSupported(false);
        setIsLoading(false);
      }
    };

    initThreeJS();
  }, [destinations, selectedPlanet, onPlanetSelect]);

  const getPlanetColor = (name: string): number => {
    switch (name.toLowerCase()) {
      case 'mars': return 0xe74c3c;
      case 'jupiter': return 0xf39c12;
      case 'saturn': return 0xf1c40f;
      case 'moon': return 0xecf0f1;
      default: return 0x667eea;
    }
  };
  if (!isThreeJSSupported) {
    return (
      <div className="solar-system-container">
        <div className="scene-info">
          <h3>⚠️ WebGL Not Supported</h3>
          <p>Your browser doesn't support 3D graphics. Showing simplified view.</p>
        </div>
        <div className="webgl-fallback">
          <p>For the full 3D experience, please update your browser or enable WebGL.</p>
          <p>Supported browsers: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+</p>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="solar-system-container">
        <div className="scene-info">
          <h3>🚀 Ultra-Fast Three.js Loading</h3>
          <p>Optimized for instant 3D graphics...</p>
        </div>
        <div className="threejs-loading">
          <div className="loading-spinner"></div>
          <p>⚡ High-performance WebGL renderer</p>
          <p>🪐 Minimal geometry planetary physics</p>
          <p>🎮 60fps interactive experience</p>
          <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '10px' }}>
            Performance optimized for all devices
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="solar-system-container">
      <div className="scene-info">
        <h3>🌌 Three.js Solar System</h3>
        <p>Click planets • Drag to rotate • Scroll to zoom • {destinations.length} destinations</p>
      </div>
      
      <div 
        ref={mountRef} 
        className="threejs-mount"
        style={{ width: '100%', height: '500px', borderRadius: '20px', overflow: 'hidden' }}
      />
      
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
      
      <div className="threejs-credits">
        <p>🎮 Powered by Three.js • Fully interactive 3D experience</p>
      </div>
    </div>
  );
};
