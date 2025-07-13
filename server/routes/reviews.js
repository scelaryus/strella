const express = require('express');
const router = express.Router();

// Mock data for reviews
let reviews = [
  {
    id: 1,
    destinationId: 1,
    destinationName: "Mars",
    customerName: "Sarah Johnson",
    rating: 5,
    title: "Incredible Experience!",
    comment: "The Mars expedition exceeded all my expectations. The views of Earth from Mars were breathtaking, and the guided tours of Olympus Mons were unforgettable.",
    date: "2024-03-15",
    verified: true
  },
  {
    id: 2,
    destinationId: 4,
    destinationName: "Moon",
    customerName: "Mike Chen",
    rating: 4,
    title: "Perfect for First-Time Space Travelers",
    comment: "Great introduction to space travel. The low gravity experience was amazing, and seeing Earth from the Moon was emotional. Only wish it was longer!",
    date: "2024-02-20",
    verified: true
  },
  {
    id: 3,
    destinationId: 2,
    destinationName: "Jupiter",
    customerName: "Emma Wilson",
    rating: 5,
    title: "Out of This World!",
    comment: "Jupiter's Great Red Spot is even more magnificent in person. The Europa landing was the highlight of the trip. Professional crew and excellent safety standards.",
    date: "2024-01-10",
    verified: true
  }
];

// GET all reviews
router.get('/', (req, res) => {
  try {
    const { destinationId, rating } = req.query;
    let filteredReviews = reviews;

    if (destinationId) {
      filteredReviews = filteredReviews.filter(r => 
        r.destinationId === parseInt(destinationId)
      );
    }

    if (rating) {
      filteredReviews = filteredReviews.filter(r => 
        r.rating === parseInt(rating)
      );
    }

    res.json({
      success: true,
      data: filteredReviews,
      count: filteredReviews.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews'
    });
  }
});

// GET single review
router.get('/:id', (req, res) => {
  try {
    const review = reviews.find(r => r.id === parseInt(req.params.id));
    
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch review'
    });
  }
});

// POST create new review
router.post('/', (req, res) => {
  try {
    const {
      destinationId,
      destinationName,
      customerName,
      rating,
      title,
      comment
    } = req.body;

    // Validation
    if (!destinationId || !customerName || !rating || !title || !comment) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be between 1 and 5'
      });
    }

    const newReview = {
      id: reviews.length + 1,
      destinationId,
      destinationName,
      customerName,
      rating,
      title,
      comment,
      date: new Date().toISOString().split('T')[0],
      verified: false // Would be verified after trip completion
    };

    reviews.push(newReview);

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: newReview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create review'
    });
  }
});

// GET reviews statistics
router.get('/stats/summary', (req, res) => {
  try {
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    
    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length
    };

    res.json({
      success: true,
      data: {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch review statistics'
    });
  }
});

module.exports = router;
