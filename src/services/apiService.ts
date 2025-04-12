
/**
 * API Service for connecting to backend MongoDB services
 * This service provides methods for making requests to your backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper function for making API requests
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('sessionToken');
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    },
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// User related API operations
export async function fetchUserByEmail(email: string) {
  return fetchAPI(`/users/by-email/${email}`);
}

export async function fetchUserById(id: string) {
  return fetchAPI(`/users/${id}`);
}

export async function createUserAPI(userData: any) {
  return fetchAPI('/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
}

export async function updateUserAPI(id: string, userData: any) {
  return fetchAPI(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData)
  });
}

// Product related API operations
export async function fetchAllProducts(filter = {}) {
  const params = new URLSearchParams();
  
  // Add filter parameters if any
  Object.entries(filter).forEach(([key, value]) => {
    params.append(key, String(value));
  });
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  return fetchAPI(`/products${queryString}`);
}

export async function fetchProductById(id: string) {
  return fetchAPI(`/products/${id}`);
}

export async function fetchProductsByFarmer(farmerId: string) {
  return fetchAPI(`/products/farmer/${farmerId}`);
}

export async function createProductAPI(productData: any) {
  return fetchAPI('/products', {
    method: 'POST',
    body: JSON.stringify(productData)
  });
}

export async function updateProductAPI(id: string, productData: any) {
  return fetchAPI(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData)
  });
}

export async function deleteProductAPI(id: string) {
  return fetchAPI(`/products/${id}`, {
    method: 'DELETE'
  });
}

// Order related API operations
export async function fetchAllOrders(filter = {}) {
  const params = new URLSearchParams();
  
  // Add filter parameters if any
  Object.entries(filter).forEach(([key, value]) => {
    params.append(key, String(value));
  });
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  return fetchAPI(`/orders${queryString}`);
}

export async function fetchOrdersByUser(userId: string) {
  return fetchAPI(`/orders/user/${userId}`);
}

export async function fetchOrdersByFarmer(farmerId: string) {
  return fetchAPI(`/orders/farmer/${farmerId}`);
}

export async function fetchOrderById(id: string) {
  return fetchAPI(`/orders/${id}`);
}

export async function createOrderAPI(orderData: any) {
  return fetchAPI('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
}

export async function updateOrderAPI(id: string, orderData: any) {
  return fetchAPI(`/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(orderData)
  });
}

// Inventory related API operations
export async function fetchInventoryForProduct(productId: string) {
  return fetchAPI(`/inventory/product/${productId}`);
}

export async function updateInventoryAPI(productId: string, quantity: number) {
  return fetchAPI(`/inventory/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity })
  });
}

// Notification related API operations
export async function fetchNotificationsForUser(userId: string) {
  return fetchAPI(`/notifications/user/${userId}`);
}

export async function createNotificationAPI(notificationData: any) {
  return fetchAPI('/notifications', {
    method: 'POST',
    body: JSON.stringify(notificationData)
  });
}

export async function markNotificationAsReadAPI(id: string) {
  return fetchAPI(`/notifications/${id}/read`, {
    method: 'PUT'
  });
}

// Cart related API operations
export async function fetchCartForUser(userId: string) {
  return fetchAPI(`/carts/user/${userId}`);
}

export async function updateCartAPI(userId: string, cartItems: any[]) {
  return fetchAPI(`/carts/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({ items: cartItems })
  });
}

export async function clearCartAPI(userId: string) {
  return fetchAPI(`/carts/${userId}/clear`, {
    method: 'PUT'
  });
}

// Review related API operations
export async function fetchReviewsForProduct(productId: string) {
  return fetchAPI(`/reviews/product/${productId}`);
}

export async function createReviewAPI(reviewData: any) {
  return fetchAPI('/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData)
  });
}

// Farm related API operations
export async function fetchFarmByFarmerId(farmerId: string) {
  return fetchAPI(`/farms/farmer/${farmerId}`);
}

export async function createOrUpdateFarmAPI(farmData: any) {
  return fetchAPI('/farms', {
    method: 'PUT',
    body: JSON.stringify(farmData)
  });
}

// Payments related API operations
export async function createPaymentAPI(paymentData: any) {
  return fetchAPI('/payments', {
    method: 'POST',
    body: JSON.stringify(paymentData)
  });
}

export async function fetchPaymentsByUser(userId: string) {
  return fetchAPI(`/payments/user/${userId}`);
}

export async function fetchPaymentByOrderId(orderId: string) {
  return fetchAPI(`/payments/order/${orderId}`);
}

export async function updatePaymentAPI(id: string, paymentData: any) {
  return fetchAPI(`/payments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(paymentData)
  });
}

// Authentication related API operations
export async function loginAPI(email: string, password: string) {
  return fetchAPI('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function registerAPI(userData: any) {
  return fetchAPI('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
}

export async function logoutAPI() {
  return fetchAPI('/auth/logout', {
    method: 'POST'
  });
}

export async function verifyToken() {
  return fetchAPI('/auth/verify');
}
