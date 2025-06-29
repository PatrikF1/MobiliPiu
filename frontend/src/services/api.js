import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const apiService = {
  // Products
  async getProducts(params = {}) {
    const response = await api.get('/products', { params })
    return response.data
  },

  async getProduct(id) {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  async addProduct(productData) {
    const response = await api.post('/products', productData);
    return response.data;
  },

  async updateProduct(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Product views tracking
  async trackProductView(productId, viewData = {}) {
    try {
      const response = await api.post(`/products/${productId}/view`, {
        session_id: viewData.sessionId || this.getSessionId(),
        referrer: document.referrer,
        ...viewData
      });
      return response.data;
    } catch (error) {
      // Ne prekidaj rad ako tracking ne radi
      console.warn('Greška pri praćenju pregleda:', error);
      return null;
    }
  },

  async getViewsStats() {
    const response = await api.get('/products/stats/views');
    return response.data;
  },

  // Helper method for session tracking
  getSessionId() {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  },

  // Categories
  async getCategories() {
    const response = await api.get('/categories')
    return response.data
  },

  // Brands
  async getBrands() {
    const response = await api.get('/brands')
    return response.data
  },

  // Contact
  async submitContactForm(formData) {
    const response = await api.post('/contact', formData)
    return response.data
  }
}

export default api 