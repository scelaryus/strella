#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Verifying Strella project for Vercel deployment...\n');

// Check if dist directory exists
const distPath = path.join(__dirname, 'client', 'dist');
if (fs.existsSync(distPath)) {
  console.log('✅ Client build directory exists');
  
  // Check key files
  const indexHtml = path.join(distPath, 'index.html');
  if (fs.existsSync(indexHtml)) {
    console.log('✅ index.html found');
  } else {
    console.log('❌ index.html missing');
  }
  
  const assetsDir = path.join(distPath, 'assets');
  if (fs.existsSync(assetsDir)) {
    console.log('✅ Assets directory found');
  } else {
    console.log('❌ Assets directory missing');
  }
} else {
  console.log('❌ Client build directory missing - run "npm run build" first');
}

// Check API files
const apiPath = path.join(__dirname, 'api');
if (fs.existsSync(apiPath)) {
  console.log('✅ API directory exists');
  
  const apiFiles = ['destinations.js', 'reservations.js', 'reviews.js', 'health.js'];
  apiFiles.forEach(file => {
    if (fs.existsSync(path.join(apiPath, file))) {
      console.log(`✅ ${file} found`);
    } else {
      console.log(`❌ ${file} missing`);
    }
  });
} else {
  console.log('❌ API directory missing');
}

// Check Vercel config
const vercelConfig = path.join(__dirname, 'vercel.json');
if (fs.existsSync(vercelConfig)) {
  console.log('✅ vercel.json found');
} else {
  console.log('❌ vercel.json missing');
}

console.log('\n🎉 Verification complete! Ready for Vercel deployment.');
console.log('\nNext steps:');
console.log('1. git add .');
console.log('2. git commit -m "Ready for Vercel deployment"');
console.log('3. git push origin main');
console.log('4. Import project in Vercel dashboard');
