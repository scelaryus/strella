export interface Destination {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  difficulty: 'Beginner' | 'Advanced' | 'Expert';
  image: string;
  highlights: string[];
  available: boolean;
}

export interface Reservation {
  id: number;
  userId: string;
  destinationId: number;
  destinationName: string;
  passengerName: string;
  email: string;
  phone: string;
  departureDate: string;
  passengers: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

export interface Review {
  id: number;
  destinationId: number;
  destinationName: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface ReservationFormData {
  destinationId: number;
  destinationName: string;
  passengerName: string;
  email: string;
  phone: string;
  departureDate: string;
  passengers: number;
  totalPrice: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
