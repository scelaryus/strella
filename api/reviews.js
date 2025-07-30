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

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, query, body } = req;

  try {
    switch (method) {
      case 'GET':
        // Handle stats endpoint
        if (query.stats === 'summary') {
          const totalReviews = reviews.length;
          const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
          
          const ratingDistribution = {
            5: reviews.filter(r => r.rating === 5).length,
            4: reviews.filter(r => r.rating === 4).length,
            3: reviews.filter(r => r.rating === 3).length,
            2: reviews.filter(r => r.rating === 2).length,
            1: reviews.filter(r => r.rating === 1).length
          };

          return res.json({
            success: true,
            data: {
              totalReviews,
              averageRating: Math.round(averageRating * 10) / 10,
              ratingDistribution
            }
          });
        }

        if (query.id) {
          // GET single review
          const review = reviews.find(r => r.id === parseInt(query.id));
          
          if (!review) {
            return res.status(404).json({
              success: false,
              error: 'Review not found'
            });
          }

          return res.json({
            success: true,
            data: review
          });
        }

        // GET all reviews with optional filters
        const { destinationId: filterDestinationId, rating: filterRating } = query;
        let filteredReviews = reviews;

        if (filterDestinationId) {
          filteredReviews = filteredReviews.filter(r => 
            r.destinationId === parseInt(filterDestinationId)
          );
        }

        if (filterRating) {
          filteredReviews = filteredReviews.filter(r => 
            r.rating === parseInt(filterRating)
          );
        }

        return res.json({
          success: true,
          data: filteredReviews,
          count: filteredReviews.length
        });

      case 'POST':
        // Create new review
        const {
          destinationId,
          destinationName,
          customerName,
          rating,
          title,
          comment
        } = body;

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

        return res.status(201).json({
          success: true,
          message: 'Review created successfully',
          data: newReview
        });

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({
          success: false,
          error: `Method ${method} Not Allowed`
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
