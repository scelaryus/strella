/**
 * Quick Three.js Performance Monitor
 * Add this to the browser console to monitor performance
 */

window.StrellaPerfMonitor = {
  startTime: null,
  frameCount: 0,
  fps: 0,
  loadTime: null,
  
  start() {
    this.startTime = performance.now();
    console.log('🚀 Strella Performance Monitor Started');
    
    // Monitor Three.js loading
    const checkThreeJS = setInterval(() => {
      const canvas = document.querySelector('canvas');
      const loading = document.querySelector('.loading-spinner');
      
      if (canvas && !loading && !this.loadTime) {
        this.loadTime = performance.now() - this.startTime;
        console.log(`🎯 Three.js loaded in ${this.loadTime.toFixed(1)}ms`);
        
        // Start FPS monitoring
        this.monitorFPS();
        clearInterval(checkThreeJS);
      }
    }, 50);
    
    setTimeout(() => clearInterval(checkThreeJS), 10000);
  },
  
  monitorFPS() {
    let lastTime = performance.now();
    let frameCount = 0;
    
    const fpsMonitor = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (frameCount % 60 === 0) {
        this.fps = 60000 / (currentTime - lastTime);
        console.log(`🎮 Current FPS: ${this.fps.toFixed(1)}`);
        lastTime = currentTime;
      }
      
      requestAnimationFrame(fpsMonitor);
    };
    
    requestAnimationFrame(fpsMonitor);
  },
  
  getReport() {
    return {
      loadTime: this.loadTime,
      currentFPS: this.fps,
      performance: {
        load: this.loadTime < 500 ? 'Excellent' : 
              this.loadTime < 1000 ? 'Good' : 
              this.loadTime < 2000 ? 'Average' : 'Slow',
        fps: this.fps > 55 ? 'Smooth' :
             this.fps > 30 ? 'Good' : 
             this.fps > 15 ? 'Choppy' : 'Laggy'
      }
    };
  },
  
  logReport() {
    const report = this.getReport();
    console.log('\n📊 Strella Performance Report:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`⚡ Load Time: ${report.loadTime?.toFixed(1) || 'N/A'}ms (${report.performance.load})`);
    console.log(`🎮 Current FPS: ${report.currentFPS.toFixed(1)} (${report.performance.fps})`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    return report;
  }
};

// Auto-start if Three.js mode is active
if (document.querySelector('canvas') || document.querySelector('.loading-spinner')) {
  window.StrellaPerfMonitor.start();
}

console.log('💡 Performance monitor loaded! Use StrellaPerfMonitor.logReport() to see results.');
