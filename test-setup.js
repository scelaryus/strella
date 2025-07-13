#!/usr/bin/env node

// Simple test script to verify Three.js integration
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Strella Space Tourism Three.js Integration');
console.log('================================================');

// Check if Three.js is in package.json
const packageJsonPath = path.join(__dirname, 'client', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  console.log('✅ Package.json found');
  console.log('📦 Dependencies:');
  console.log(`   - three: ${packageJson.dependencies.three || 'NOT FOUND'}`);
  console.log(`   - @types/three: ${packageJson.devDependencies['@types/three'] || 'NOT FOUND'}`);
  
  // Check if node_modules exists
  const nodeModulesPath = path.join(__dirname, 'client', 'node_modules', 'three');
  if (fs.existsSync(nodeModulesPath)) {
    console.log('✅ Three.js installed in node_modules');
  } else {
    console.log('❌ Three.js not found in node_modules');
    console.log('   Run: cd client && npm install');
  }
} else {
  console.log('❌ Package.json not found');
}

// Check if component files exist
const componentFiles = [
  'client/src/components/PlanetSlider/PlanetSlider.tsx',
  'client/src/components/Planet3D/ThreeJSPlanet.tsx',
  'client/src/components/Planet3D/CSS3DPlanet.tsx',
  'client/src/components/Planet3D/SimplePlanet3D.tsx'
];

console.log('\n🧩 Component Files:');
componentFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file}`);
  }
});

// Check server files
const serverFiles = [
  'server/index.js',
  'server/routes/destinations.js',
  'server/package.json'
];

console.log('\n🖥️  Server Files:');
serverFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file}`);
  }
});

console.log('\n🚀 Quick Start Instructions:');
console.log('1. Backend: cd server && npm install && node index.js');
console.log('2. Frontend: cd client && npm install && npm run dev');
console.log('3. Open: http://localhost:5173');
console.log('\n🎮 Test all 4 modes: 2D View → Simple 3D → CSS 3D → Three.js');
console.log('\n✨ Three.js controls: Drag to rotate, Scroll to zoom, Click planets');
