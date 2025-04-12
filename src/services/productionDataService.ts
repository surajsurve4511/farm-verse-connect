
/**
 * Production Data Service
 * This service uses the API service to interact with backend MongoDB
 */

import * as apiService from './apiService';

// User related operations
export async function getUserByEmail(email: string) {
  return apiService.fetchUserByEmail(email);
}

export async function getUserById(id: string) {
  return apiService.fetchUserById(id);
}

export async function createUser(userData: any) {
  return apiService.createUserAPI(userData);
}

export async function updateUser(id: string, userData: any) {
  return apiService.updateUserAPI(id, userData);
}

// Product related operations
export async function getAllProducts(filter = {}) {
  return apiService.fetchAllProducts(filter);
}

export async function getProductById(id: string) {
  return apiService.fetchProductById(id);
}

export async function getProductsByFarmer(farmerId: string) {
  return apiService.fetchProductsByFarmer(farmerId);
}

export async function createProduct(productData: any) {
  return apiService.createProductAPI(productData);
}

export async function updateProduct(id: string, productData: any) {
  return apiService.updateProductAPI(id, productData);
}

export async function deleteProduct(id: string) {
  return apiService.deleteProductAPI(id);
}

// Order related operations
export async function getAllOrders(filter = {}) {
  return apiService.fetchAllOrders(filter);
}

export async function getOrdersByUser(userId: string) {
  return apiService.fetchOrdersByUser(userId);
}

export async function getOrdersByFarmer(farmerId: string) {
  return apiService.fetchOrdersByFarmer(farmerId);
}

export async function getOrderById(id: string) {
  return apiService.fetchOrderById(id);
}

export async function createOrder(orderData: any) {
  return apiService.createOrderAPI(orderData);
}

export async function updateOrder(id: string, orderData: any) {
  return apiService.updateOrderAPI(id, orderData);
}

// Inventory related operations
export async function getInventoryForProduct(productId: string) {
  return apiService.fetchInventoryForProduct(productId);
}

export async function updateInventory(productId: string, quantity: number) {
  return apiService.updateInventoryAPI(productId, quantity);
}

// Notification related operations
export async function getNotificationsForUser(userId: string) {
  return apiService.fetchNotificationsForUser(userId);
}

export async function createNotification(notificationData: any) {
  return apiService.createNotificationAPI(notificationData);
}

export async function markNotificationAsRead(id: string) {
  return apiService.markNotificationAsReadAPI(id);
}

// Cart related operations
export async function getCartForUser(userId: string) {
  return apiService.fetchCartForUser(userId);
}

export async function updateCart(userId: string, cartItems: any[]) {
  return apiService.updateCartAPI(userId, cartItems);
}

export async function clearCart(userId: string) {
  return apiService.clearCartAPI(userId);
}

// Review related operations
export async function getReviewsForProduct(productId: string) {
  return apiService.fetchReviewsForProduct(productId);
}

export async function createReview(reviewData: any) {
  return apiService.createReviewAPI(reviewData);
}

// Farm related operations
export async function getFarmByFarmerId(farmerId: string) {
  return apiService.fetchFarmByFarmerId(farmerId);
}

export async function createOrUpdateFarm(farmData: any) {
  return apiService.createOrUpdateFarmAPI(farmData);
}

// Payments related operations
export async function createPayment(paymentData: any) {
  return apiService.createPaymentAPI(paymentData);
}

export async function getPaymentsByUser(userId: string) {
  return apiService.fetchPaymentsByUser(userId);
}

export async function getPaymentByOrderId(orderId: string) {
  return apiService.fetchPaymentByOrderId(orderId);
}

export async function updatePayment(id: string, paymentData: any) {
  return apiService.updatePaymentAPI(id, paymentData);
}
