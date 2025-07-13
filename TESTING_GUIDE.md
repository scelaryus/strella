# 🧪 Strella Space Tourism - Testing Guide

## 🚀 How to Test the Application

### Quick Start Instructions

1. **Open PowerShell as Administrator**
   ```powershell
   cd "c:\Users\Y-Tech\Desktop\Revamp\strella-modern"
   ```

2. **Start Backend Server (Terminal 1)**
   ```powershell
   cd server
   npm install
   node index.js
   ```
   ✅ You should see: "🚀 Strella server is running on port 5000"

3. **Start Frontend Server (Terminal 2)**
   ```powershell
   cd client
   npm install
   npm run dev
   ```
   ✅ You should see: "Local: http://localhost:5173"

4. **Open in Browser**
   - Navigate to: http://localhost:5173
   - Backend API: http://localhost:5000/api/destinations

## 🎮 Testing the 4-Mode Visualization System

### 1. 🌍 **2D View Mode (Default)**
**What to Test:**
- ✅ Classic image slider with destinations
- ✅ Auto-rotating carousel (changes every 5 seconds)
- ✅ Navigation arrows (prev/next)
- ✅ Dot indicators at bottom
- ✅ Responsive design on mobile
- ✅ Destination details (price, duration, difficulty)
- ✅ "Learn More" and "Book Now" buttons

**Expected Behavior:**
- Smooth slide transitions
- Difficulty badges with color coding (Beginner=green, Advanced=orange, Expert=red)
- Image fallbacks if SVGs don't load
- Mobile-optimized touch controls

### 2. 🪐 **Simple 3D Mode**
**What to Test:**
- ✅ CSS-based 3D animations
- ✅ Floating planet cards
- ✅ Hover effects and interactions
- ✅ Planet selection functionality
- ✅ Smooth animations without WebGL

**Expected Behavior:**
- Planets float and rotate using CSS transforms
- Hover effects reveal destination details
- Smooth transitions between planets
- No dependency on WebGL/Three.js

### 3. ✨ **CSS 3D Mode**
**What to Test:**
- ✅ Advanced CSS3D solar system
- ✅ Orbital mechanics simulation
- ✅ Saturn's animated ring system
- ✅ Star field background
- ✅ Interactive planet selection
- ✅ Detailed information panels

**Expected Behavior:**
- Planets orbit around central sun
- Saturn shows animated rings
- Twinkling star background
- Click planets to see detailed info
- Orbital speeds vary by planet
- 3D perspective transformations

### 4. 🚀 **Three.js Mode (WebGL)**
**What to Test:**
- ✅ Full 3D WebGL experience
- ✅ Interactive camera controls
- ✅ Planet physics and orbits
- ✅ Dynamic lighting and shadows
- ✅ WebGL fallback detection

**Interactive Controls:**
- **Drag**: Rotate camera around solar system
- **Scroll**: Zoom in/out
- **Click**: Select planets for information
- **Mobile**: Touch-optimized controls

**Expected Behavior:**
- Realistic 3D rendering
- Smooth 60fps animations
- Interactive camera manipulation
- Planet selection highlights
- Atmospheric glow effects
- Automatic fallback if WebGL unavailable

## 🔧 Error Handling Tests

### API Fallback System
**Test Scenario 1: Backend Offline**
1. Stop the backend server (Ctrl+C in server terminal)
2. Refresh the frontend
3. ✅ Should show "Offline Mode" badge
4. ✅ Should display sample destinations (Mars, Jupiter, Saturn, Moon)
5. ✅ All 4 modes should still work with fallback data

**Test Scenario 2: WebGL Unavailable**
1. Open browser developer tools (F12)
2. Go to Settings > Rendering > Disable WebGL
3. Switch to Three.js mode
4. ✅ Should show fallback message
5. ✅ Should suggest alternative modes

### Browser Compatibility
**Test in Different Browsers:**
- ✅ Chrome 60+ (Full support)
- ✅ Firefox 55+ (Full support)  
- ✅ Safari 12+ (WebGL support)
- ✅ Edge 79+ (Complete compatibility)
- ⚠️ Older browsers (Graceful degradation to 2D)

## 📱 Mobile Responsiveness

### Test on Different Screen Sizes
1. **Desktop** (1920x1080+)
   - All 4 modes fully functional
   - Mouse controls for Three.js

2. **Tablet** (768px-1024px)
   - Touch-optimized controls
   - Responsive button layout

3. **Mobile** (320px-767px)
   - Vertical button layout
   - Touch gestures for 3D modes
   - Simplified Three.js controls

### Mobile-Specific Tests
- ✅ Touch drag in Three.js mode
- ✅ Pinch zoom functionality
- ✅ Responsive view toggle buttons
- ✅ Mobile-optimized animations

## 🎯 Performance Tests

### Loading Performance
- ✅ Initial page load under 3 seconds
- ✅ Three.js dynamic import (lazy loading)
- ✅ Smooth 60fps animations
- ✅ No memory leaks on mode switching

### Memory Usage
- ✅ Clean component unmounting
- ✅ Three.js scene disposal
- ✅ Event listener cleanup
- ✅ No growing memory consumption

## 🐛 Known Issues & Solutions

### Issue 1: Three.js Import Error
**Symptom:** "Cannot find module 'three'"
**Solution:** Dynamic import with fallback implemented
**Fallback:** Automatically switches to CSS 3D mode

### Issue 2: WebGL Context Loss (Mobile)
**Symptom:** Three.js stops rendering
**Solution:** WebGL detection and automatic fallback
**Fallback:** Shows user-friendly message with alternatives

### Issue 3: CSS3D Performance on Older Devices
**Symptom:** Laggy animations
**Solution:** Reduced animation complexity for mobile
**Fallback:** Automatic degradation to Simple 3D

## ✅ Testing Checklist

### Functionality Tests
- [ ] All 4 modes render correctly
- [ ] Mode switching without errors
- [ ] API connectivity and fallback data
- [ ] Planet selection in 3D modes
- [ ] Navigation controls (2D mode)
- [ ] Responsive design across devices
- [ ] Error handling for offline scenarios

### Performance Tests
- [ ] Smooth animations (60fps target)
- [ ] Memory usage stable during mode switching
- [ ] Fast initial load time
- [ ] Three.js cleanup on component unmount
- [ ] No console errors

### Cross-Browser Tests
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Accessibility Tests
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] High contrast mode
- [ ] Reduced motion preferences

## 🎉 Success Criteria

**The application is working correctly when:**

1. **All 4 modes render without errors**
2. **Smooth transitions between modes**
3. **API fallback system functions properly**
4. **Responsive design works on all devices**
5. **Three.js loads and renders correctly (or falls back gracefully)**
6. **No console errors in browser developer tools**
7. **Performance remains smooth during interactions**

## 🚀 What You Should See

### Homepage (http://localhost:5173)
- ✅ Modern space-themed design
- ✅ Hero section with call-to-action
- ✅ Planet slider/3D viewer section
- ✅ 4-button mode toggle
- ✅ Offline mode indicator (if backend down)

### Mode Switching
- ✅ Instant mode switching with smooth transitions
- ✅ Active mode highlighted in toggle buttons
- ✅ Each mode shows the same destination data
- ✅ Consistent user experience across modes

### Destination Data
- ✅ Mars (Advanced, $50,000, 6 months)
- ✅ Jupiter (Expert, $75,000, 8 months)  
- ✅ Saturn (Expert, $80,000, 10 months)
- ✅ Moon (Beginner, $25,000, 2 weeks)

**🌌 Ready to explore the cosmos with Strella!**
