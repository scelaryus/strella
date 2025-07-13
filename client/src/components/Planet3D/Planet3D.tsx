import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import type { Destination } from '../../types';

interface Planet3DProps {
  destination: Destination;
  position: [number, number, number];
  onClick?: () => void;
  isSelected?: boolean;
}

export const Planet3D = ({ destination, position, onClick, isSelected }: Planet3DProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Rotate the planet
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      
      // Add floating animation when hovered or selected
      if (hovered || isSelected) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
        meshRef.current.scale.setScalar(1.1);
      } else {
        meshRef.current.position.y = position[1];
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const getPlanetColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'mars': return '#ff6b6b';
      case 'jupiter': return '#f39c12';
      case 'saturn': return '#f1c40f';
      case 'moon': return '#ecf0f1';
      default: return '#667eea';
    }
  };

  const getPlanetTexture = (name: string) => {
    // Create different materials for each planet
    const baseColor = getPlanetColor(name);
    
    return {
      color: baseColor,
      roughness: name.toLowerCase() === 'moon' ? 0.8 : 0.3,
      metalness: name.toLowerCase() === 'jupiter' ? 0.1 : 0.0,
      emissive: isSelected ? '#222' : '#000',
    };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return '#4ade80';
      case 'advanced': return '#f59e0b';
      case 'expert': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <group position={position}>
      {/* Planet Sphere */}
      <Sphere
        ref={meshRef}
        args={[1, 32, 32]}
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial {...getPlanetTexture(destination.name)} />
      </Sphere>

      {/* Saturn's Rings */}
      {destination.name.toLowerCase() === 'saturn' && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.5, 2, 32]} />
            <meshStandardMaterial 
              color="#bdc3c7" 
              transparent 
              opacity={0.6}
              side={2}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.2, 2.5, 32]} />
            <meshStandardMaterial 
              color="#95a5a6" 
              transparent 
              opacity={0.4}
              side={2}
            />
          </mesh>
        </>
      )}

      {/* Planet Name */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {destination.name}
      </Text>

      {/* Difficulty Badge */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.2}
        color={getDifficultyColor(destination.difficulty)}
        anchorX="center"
        anchorY="middle"
      >
        {destination.difficulty}
      </Text>

      {/* Price Tag */}
      <Text
        position={[0, -3, 0]}
        fontSize={0.25}
        color="#667eea"
        anchorX="center"
        anchorY="middle"
      >
        ${destination.price.toLocaleString()}
      </Text>

      {/* Orbit Path (when selected) */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3, 3.1, 64]} />
          <meshBasicMaterial 
            color="#667eea" 
            transparent 
            opacity={0.3}
          />
        </mesh>
      )}

      {/* Atmospheric Glow */}
      <Sphere args={[1.05, 32, 32]}>
        <meshBasicMaterial 
          color={getPlanetColor(destination.name)}
          transparent 
          opacity={hovered ? 0.2 : 0.1}
        />
      </Sphere>
    </group>
  );
};
