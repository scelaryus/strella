import axios from 'axios';
import type { 
  Destination, 
  Reservation, 
  Review, 
  ApiResponse, 
  ReviewStats, 
  ReservationFormData,
  ContactFormData
} from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

// Destinations API
export const destinationsAPI = {
  getAll: (): Promise<ApiResponse<Destination[]>> => 
    api.get('/destinations'),
  
  getById: (id: number): Promise<ApiResponse<Destination>> => 
    api.get(`/destinations/${id}`),
  
  getByDifficulty: (difficulty: string): Promise<ApiResponse<Destination[]>> => 
    api.get(`/destinations/difficulty/${difficulty}`),
};

// Reservations API
export const reservationsAPI = {
  getAll: (): Promise<ApiResponse<Reservation[]>> => 
    api.get('/reservations'),
  
  getById: (id: number): Promise<ApiResponse<Reservation>> => 
    api.get(`/reservations/${id}`),
  
  create: (data: ReservationFormData): Promise<ApiResponse<Reservation>> => 
    api.post('/reservations', data),
  
  updateStatus: (id: number, status: string): Promise<ApiResponse<Reservation>> => 
    api.put(`/reservations/${id}`, { status }),
  
  delete: (id: number): Promise<ApiResponse<void>> => 
    api.delete(`/reservations/${id}`),
};

// Reviews API
export const reviewsAPI = {
  getAll: (params?: { destinationId?: number; rating?: number }): Promise<ApiResponse<Review[]>> => 
    api.get('/reviews', { params }),
  
  getById: (id: number): Promise<ApiResponse<Review>> => 
    api.get(`/reviews/${id}`),
  
  create: (data: Omit<Review, 'id' | 'date' | 'verified'>): Promise<ApiResponse<Review>> => 
    api.post('/reviews', data),
  
  getStats: (): Promise<ApiResponse<ReviewStats>> => 
    api.get('/reviews/stats/summary'),
};

// Health check
export const healthAPI = {
  check: (): Promise<{ status: string; message: string; timestamp: string }> => 
    api.get('/health'),
};

// Contact form (mock - would need backend endpoint)
export const contactAPI = {
  send: (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    // Mock implementation - in real app, this would send to backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Message sent successfully! We will get back to you soon.'
        });
      }, 1000);
    });
  },
};

export default api;
