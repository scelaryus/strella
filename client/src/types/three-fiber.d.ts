// Type definitions for React Three Fiber JSX elements
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

// Extend the JSX namespace to include Three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Geometries
      sphereGeometry: ReactThreeFiber.Object3DNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>
      ringGeometry: ReactThreeFiber.Object3DNode<THREE.RingGeometry, typeof THREE.RingGeometry>
      
      // Materials
      meshStandardMaterial: ReactThreeFiber.MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>
      meshBasicMaterial: ReactThreeFiber.MaterialNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>
      
      // Objects
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>
      group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>
      
      // Lights
      directionalLight: ReactThreeFiber.Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>
      ambientLight: ReactThreeFiber.Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>
    }
  }
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    sphereGeometry: ReactThreeFiber.Object3DNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>
    ringGeometry: ReactThreeFiber.Object3DNode<THREE.RingGeometry, typeof THREE.RingGeometry>
    meshStandardMaterial: ReactThreeFiber.MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>
    meshBasicMaterial: ReactThreeFiber.MaterialNode<THREE.MeshBasicMaterial, typeof THREE.MeshBasicMaterial>
    mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>
    group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>
    directionalLight: ReactThreeFiber.Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>
    ambientLight: ReactThreeFiber.Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>
  }
}
