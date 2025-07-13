import { useState, useEffect } from 'react';
import { destinationsAPI } from '../../services/api';
import type { Destination } from '../../types';
import './Destinations.css';

export const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await destinationsAPI.getAll();
        if (response.success && response.data) {
          setDestinations(response.data);
          setFilteredDestinations(response.data);
        }
      } catch (err) {
        setError('Failed to load destinations');
        console.error('Error fetching destinations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    let filtered = [...destinations];

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(dest => 
        dest.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }

    // Sort destinations
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredDestinations(filtered);
  }, [destinations, selectedDifficulty, sortBy]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return '#4ade80';
      case 'advanced': return '#f59e0b';
      case 'expert': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="destinations-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading destinations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="destinations-page">
        <div className="error-container">
          <h2>Unable to load destinations</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="destinations-page">
      <div className="destinations-hero">
        <div className="container">
          <h1 className="page-title">Space Destinations</h1>
          <p className="page-subtitle">
            Choose your next cosmic adventure from our carefully curated selection of destinations
          </p>
        </div>
      </div>

      <div className="container">
        <div className="destinations-filters">
          <div className="filter-group">
            <label htmlFor="difficulty">Filter by Difficulty:</label>
            <select 
              id="difficulty"
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort">Sort by:</label>
            <select 
              id="sort"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Duration</option>
            </select>
          </div>

          <div className="results-count">
            {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
          </div>
        </div>

        <div className="destinations-grid">
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="destination-card">
              <div className="card-image">
                <img 
                  src={`/images/${destination.image}`} 
                  alt={destination.name}
                  onError={(e) => {
                    e.currentTarget.src = '/images/default-planet.jpg';
                  }}
                />
                <div className="card-overlay">
                  <div 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(destination.difficulty) }}
                  >
                    {destination.difficulty}
                  </div>
                  {destination.available ? (
                    <div className="availability-badge available">Available</div>
                  ) : (
                    <div className="availability-badge unavailable">Fully Booked</div>
                  )}
                </div>
              </div>

              <div className="card-content">
                <h3 className="destination-name">{destination.name}</h3>
                <p className="destination-description">{destination.description}</p>

                <div className="destination-details">
                  <div className="detail-row">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">{destination.duration}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value price">${destination.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="destination-highlights">
                  <h4>Key Highlights:</h4>
                  <ul>
                    {destination.highlights.slice(0, 3).map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="card-actions">
                  <button className="btn btn-primary" disabled={!destination.available}>
                    {destination.available ? 'Book Now' : 'Fully Booked'}
                  </button>
                  <button className="btn btn-secondary">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="no-results">
            <h3>No destinations found</h3>
            <p>Try adjusting your filters to see more options.</p>
          </div>
        )}
      </div>
    </div>
  );
};
