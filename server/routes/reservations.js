const express = require('express');
const router = express.Router();

// Mock database for reservations
let reservations = [
  {
    id: 1,
    userId: "user123",
    destinationId: 1,
    destinationName: "Mars",
    passengerName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1234567890",
    departureDate: "2024-06-15",
    passengers: 2,
    totalPrice: 100000,
    status: "confirmed",
    createdAt: new Date().toISOString()
  }
];

// GET all reservations
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: reservations,
      count: reservations.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reservations'
    });
  }
});

// GET single reservation
router.get('/:id', (req, res) => {
  try {
    const reservation = reservations.find(r => r.id === parseInt(req.params.id));
    
    if (!reservation) {
      return res.status(404).json({
        success: false,
        error: 'Reservation not found'
      });
    }

    res.json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reservation'
    });
  }
});

// POST create new reservation
router.post('/', (req, res) => {
  try {
    const {
      destinationId,
      destinationName,
      passengerName,
      email,
      phone,
      departureDate,
      passengers,
      totalPrice
    } = req.body;

    // Validation
    if (!destinationId || !passengerName || !email || !departureDate || !passengers) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const newReservation = {
      id: reservations.length + 1,
      userId: `user${Date.now()}`, // In real app, this would come from auth
      destinationId,
      destinationName,
      passengerName,
      email,
      phone,
      departureDate,
      passengers,
      totalPrice,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    reservations.push(newReservation);

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: newReservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create reservation'
    });
  }
});

// PUT update reservation status
router.put('/:id', (req, res) => {
  try {
    const { status } = req.body;
    const reservationIndex = reservations.findIndex(r => r.id === parseInt(req.params.id));
    
    if (reservationIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Reservation not found'
      });
    }

    reservations[reservationIndex].status = status;
    reservations[reservationIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Reservation updated successfully',
      data: reservations[reservationIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update reservation'
    });
  }
});

// DELETE reservation
router.delete('/:id', (req, res) => {
  try {
    const reservationIndex = reservations.findIndex(r => r.id === parseInt(req.params.id));
    
    if (reservationIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Reservation not found'
      });
    }

    reservations.splice(reservationIndex, 1);

    res.json({
      success: true,
      message: 'Reservation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete reservation'
    });
  }
});

module.exports = router;
