#!/usr/bin/env node

/**
 * Performance Testing Script for Strella Three.js Optimization
 * Tests loading times and FPS for the 3D planetary system
 */

const { chromium } = require('playwright');

async function testThreeJSPerformance() {
  console.log('🚀 Starting Three.js Performance Test...\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to the application
  await page.goto('http://localhost:5173');

  // Wait for the app to load
  await page.waitForSelector('.render-mode-toggle', { timeout: 10000 });

  console.log('✅ Application loaded successfully');

  // Switch to Three.js mode
  await page.click('button[data-mode="threejs"]');
  console.log('🌌 Switched to Three.js mode');

  // Performance monitoring
  const performanceMetrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      const startTime = performance.now();
      let loadComplete = false;
      let fps = 0;
      let frameCount = 0;
      let lastTime = startTime;

      // Check if Three.js is loaded
      const checkLoaded = setInterval(() => {
        const canvas = document.querySelector('canvas');
        const loadingSpinner = document.querySelector('.loading-spinner');
        
        if (canvas && !loadingSpinner && !loadComplete) {
          loadComplete = true;
          const loadTime = performance.now() - startTime;
          
          console.log(`🎯 Three.js loaded in ${loadTime.toFixed(1)}ms`);
          
          // Monitor FPS for 3 seconds
          const fpsMonitor = setInterval(() => {
            frameCount++;
            const currentTime = performance.now();
            
            if (frameCount % 60 === 0) {
              fps = 60000 / (currentTime - lastTime);
              lastTime = currentTime;
            }
          }, 16); // ~60fps

          setTimeout(() => {
            clearInterval(fpsMonitor);
            resolve({
              loadTime: loadTime,
              averageFPS: fps,
              success: true
            });
          }, 3000);
        }
      }, 100);

      // Timeout after 15 seconds
      setTimeout(() => {
        clearInterval(checkLoaded);
        resolve({
          loadTime: -1,
          averageFPS: 0,
          success: false,
          error: 'Timeout waiting for Three.js to load'
        });
      }, 15000);
    });
  });

  console.log('\n📊 Performance Test Results:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  if (performanceMetrics.success) {
    console.log(`✅ Load Time: ${performanceMetrics.loadTime.toFixed(1)}ms`);
    console.log(`🎮 Average FPS: ${performanceMetrics.averageFPS.toFixed(1)}`);
    
    // Performance ratings
    const loadRating = performanceMetrics.loadTime < 500 ? '🚀 Excellent' : 
                      performanceMetrics.loadTime < 1000 ? '⚡ Good' : 
                      performanceMetrics.loadTime < 2000 ? '⚠️ Average' : '🐌 Slow';
    
    const fpsRating = performanceMetrics.averageFPS > 55 ? '🚀 Smooth' :
                     performanceMetrics.averageFPS > 30 ? '⚡ Good' : 
                     performanceMetrics.averageFPS > 15 ? '⚠️ Choppy' : '🐌 Laggy';
    
    console.log(`📈 Load Performance: ${loadRating}`);
    console.log(`🎯 Frame Performance: ${fpsRating}`);
    
    if (performanceMetrics.loadTime < 1000 && performanceMetrics.averageFPS > 30) {
      console.log('\n🎉 OPTIMIZATION SUCCESS! Three.js is running smoothly.');
    } else {
      console.log('\n⚠️ Further optimization may be needed.');
    }
  } else {
    console.log('❌ Test Failed:', performanceMetrics.error);
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  await browser.close();
}

// Run the test if both servers are available
async function main() {
  try {
    const response = await fetch('http://localhost:5173');
    if (response.ok) {
      await testThreeJSPerformance();
    } else {
      console.log('❌ Frontend server not running. Please start with: npm run dev');
    }
  } catch (error) {
    console.log('❌ Could not connect to servers. Please ensure both backend and frontend are running.');
    console.log('💡 Run: npm run start:all or use the quick-start.ps1 script');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testThreeJSPerformance };
