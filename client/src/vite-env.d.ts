/// <reference types="vite/client" />

// Extend JSX namespace for React Three Fiber
declare namespace JSX {
  interface IntrinsicElements {
    mesh: any
    group: any
    sphereGeometry: any
    ringGeometry: any
    meshStandardMaterial: any
    meshBasicMaterial: any
    directionalLight: any
    ambientLight: any
  }
}
