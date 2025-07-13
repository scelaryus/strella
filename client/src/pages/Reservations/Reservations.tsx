import { useState, useEffect } from 'react';
import { reservationsAPI, destinationsAPI } from '../../services/api';
import type { Destination, ReservationFormData } from '../../types';
import './Reservations.css';

export const Reservations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [formData, setFormData] = useState<ReservationFormData>({
    destinationId: 0,
    destinationName: '',
    passengerName: '',
    email: '',
    phone: '',
    departureDate: '',
    passengers: 1,
    totalPrice: 0
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await destinationsAPI.getAll();
        if (response.success && response.data) {
          setDestinations(response.data.filter(d => d.available));
        }
      } catch (err) {
        console.error('Error fetching destinations:', err);
      }
    };

    fetchDestinations();
  }, []);

  const handleDestinationChange = (destinationId: number) => {
    const destination = destinations.find(d => d.id === destinationId);
    if (destination) {
      setFormData(prev => ({
        ...prev,
        destinationId,
        destinationName: destination.name,
        totalPrice: destination.price * prev.passengers
      }));
    }
  };

  const handlePassengersChange = (passengers: number) => {
    const destination = destinations.find(d => d.id === formData.destinationId);
    setFormData(prev => ({
      ...prev,
      passengers,
      totalPrice: destination ? destination.price * passengers : 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.destinationId || !formData.passengerName || !formData.email || !formData.departureDate) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await reservationsAPI.create(formData);
      if (response.success) {
        setSuccess(true);
        setFormData({
          destinationId: 0,
          destinationName: '',
          passengerName: '',
          email: '',
          phone: '',
          departureDate: '',
          passengers: 1,
          totalPrice: 0
        });
      }
    } catch (err) {
      setError('Failed to create reservation. Please try again.');
      console.error('Reservation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setMonth(today.getMonth() + 3); // Minimum 3 months in advance
    return today.toISOString().split('T')[0];
  };

  if (success) {
    return (
      <div className="reservations-page">
        <div className="container">
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h2>Reservation Confirmed!</h2>
            <p>Thank you for booking with Strella. We'll contact you soon with further details.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setSuccess(false)}
            >
              Make Another Reservation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reservations-page">
      <div className="reservations-hero">
        <div className="container">
          <h1 className="page-title">Book Your Space Journey</h1>
          <p className="page-subtitle">
            Ready to explore the cosmos? Reserve your spot on an unforgettable adventure.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="reservation-form-container">
          <form onSubmit={handleSubmit} className="reservation-form">
            <div className="form-section">
              <h3>Destination Selection</h3>
              <div className="form-group">
                <label htmlFor="destination">Choose Your Destination *</label>
                <select
                  id="destination"
                  value={formData.destinationId}
                  onChange={(e) => handleDestinationChange(Number(e.target.value))}
                  required
                  className="form-input"
                >
                  <option value={0}>Select a destination</option>
                  {destinations.map(dest => (
                    <option key={dest.id} value={dest.id}>
                      {dest.name} - ${dest.price.toLocaleString()} ({dest.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="passengers">Number of Passengers *</label>
                <select
                  id="passengers"
                  value={formData.passengers}
                  onChange={(e) => handlePassengersChange(Number(e.target.value))}
                  className="form-input"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="departureDate">Preferred Departure Date *</label>
                <input
                  type="date"
                  id="departureDate"
                  value={formData.departureDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, departureDate: e.target.value }))}
                  min={getMinDate()}
                  required
                  className="form-input"
                />
                <small>Reservations must be made at least 3 months in advance</small>
              </div>
            </div>

            <div className="form-section">
              <h3>Passenger Information</h3>
              <div className="form-group">
                <label htmlFor="passengerName">Full Name *</label>
                <input
                  type="text"
                  id="passengerName"
                  value={formData.passengerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, passengerName: e.target.value }))}
                  required
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="form-input"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {formData.totalPrice > 0 && (
              <div className="form-section">
                <h3>Booking Summary</h3>
                <div className="booking-summary">
                  <div className="summary-row">
                    <span>Destination:</span>
                    <span>{formData.destinationName}</span>
                  </div>
                  <div className="summary-row">
                    <span>Passengers:</span>
                    <span>{formData.passengers}</span>
                  </div>
                  <div className="summary-row">
                    <span>Departure Date:</span>
                    <span>{formData.departureDate || 'Not selected'}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Price:</span>
                    <span>${formData.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={loading || formData.totalPrice === 0}
            >
              {loading ? 'Processing...' : 'Reserve Now'}
            </button>
          </form>

          <div className="reservation-info">
            <h3>What's Next?</h3>
            <div className="info-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Confirmation</h4>
                  <p>You'll receive a confirmation email within 24 hours</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Training Schedule</h4>
                  <p>We'll arrange your pre-flight training program</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Final Preparations</h4>
                  <p>Complete health checks and final briefings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
