// Mock data for destinations (planets)
const destinations = [
  {
    id: 1,
    name: "Mars",
    description: "The Red Planet - Experience the rugged beauty of Mars with its vast canyons and towering volcanoes.",
    price: 50000,
    duration: "6 months",
    difficulty: "Advanced",
    image: "mars.svg",
    highlights: [
      "Olympus Mons - largest volcano in the solar system",
      "Valles Marineris - massive canyon system",
      "Polar ice caps exploration",
      "Martian sunrise and sunset viewing"
    ],
    available: true
  },
  {
    id: 2,
    name: "Jupiter",
    description: "The Gas Giant - Witness the magnificent storms and explore the fascinating moons of Jupiter.",
    price: 75000,
    duration: "8 months",
    difficulty: "Expert",
    image: "jupiter.svg",
    highlights: [
      "Great Red Spot observation",
      "Europa moon landing",
      "Io volcanic activity viewing",
      "Ganymede exploration"
    ],
    available: true
  },
  {
    id: 3,
    name: "Saturn",
    description: "The Ringed Wonder - Marvel at Saturn's spectacular ring system and explore its mysterious moons.",
    price: 80000,
    duration: "10 months",
    difficulty: "Expert",
    image: "saturn.svg",
    highlights: [
      "Ring system flythrough",
      "Titan moon surface landing",
      "Enceladus geysers viewing",
      "Cassini Division exploration"
    ],
    available: true
  },
  {
    id: 4,
    name: "Moon",
    description: "Earth's Companion - Perfect for beginners, experience low gravity and stunning Earth views.",
    price: 25000,
    duration: "2 weeks",
    difficulty: "Beginner",
    image: "moon.svg",
    highlights: [
      "Sea of Tranquility landing",
      "Earth-rise viewing",
      "Low gravity recreation",
      "Lunar cave exploration"
    ],
    available: true
  }
];

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { query } = req;
  
  try {
    // Handle different endpoints based on query parameters
    if (query.id) {
      // GET single destination
      const destination = destinations.find(d => d.id === parseInt(query.id));
      
      if (!destination) {
        return res.status(404).json({
          success: false,
          error: 'Destination not found'
        });
      }

      return res.json({
        success: true,
        data: destination
      });
    }
    
    if (query.difficulty) {
      // GET destinations by difficulty
      const filtered = destinations.filter(d => 
        d.difficulty.toLowerCase() === query.difficulty.toLowerCase()
      );

      return res.json({
        success: true,
        data: filtered,
        count: filtered.length
      });
    }

    // GET all destinations
    res.json({
      success: true,
      data: destinations,
      count: destinations.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch destinations'
    });
  }
}
