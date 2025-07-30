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
        if (query.id) {
          // GET single reservation
          const reservation = reservations.find(r => r.id === parseInt(query.id));
          
          if (!reservation) {
            return res.status(404).json({
              success: false,
              error: 'Reservation not found'
            });
          }

          return res.json({
            success: true,
            data: reservation
          });
        }

        // GET all reservations
        return res.json({
          success: true,
          data: reservations,
          count: reservations.length
        });

      case 'POST':
        // Create new reservation
        const {
          destinationId,
          destinationName,
          passengerName,
          email,
          phone,
          departureDate,
          passengers,
          totalPrice
        } = body;

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

        return res.status(201).json({
          success: true,
          message: 'Reservation created successfully',
          data: newReservation
        });

      case 'PUT':
        // Update reservation status
        if (!query.id) {
          return res.status(400).json({
            success: false,
            error: 'Reservation ID required'
          });
        }

        const { status } = body;
        const reservationIndex = reservations.findIndex(r => r.id === parseInt(query.id));
        
        if (reservationIndex === -1) {
          return res.status(404).json({
            success: false,
            error: 'Reservation not found'
          });
        }

        reservations[reservationIndex].status = status;
        reservations[reservationIndex].updatedAt = new Date().toISOString();

        return res.json({
          success: true,
          message: 'Reservation updated successfully',
          data: reservations[reservationIndex]
        });

      case 'DELETE':
        // Delete reservation
        if (!query.id) {
          return res.status(400).json({
            success: false,
            error: 'Reservation ID required'
          });
        }

        const deleteIndex = reservations.findIndex(r => r.id === parseInt(query.id));
        
        if (deleteIndex === -1) {
          return res.status(404).json({
            success: false,
            error: 'Reservation not found'
          });
        }

        reservations.splice(deleteIndex, 1);

        return res.json({
          success: true,
          message: 'Reservation deleted successfully'
        });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
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
