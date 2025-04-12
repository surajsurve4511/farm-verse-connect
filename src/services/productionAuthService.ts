
/**
 * Production Auth Service
 * This service uses the API service for authentication operations
 */

import { loginAPI, registerAPI, logoutAPI, verifyToken } from './apiService';

// Login function
export async function login(email: string, password: string) {
  try {
    const response = await loginAPI(email, password);
    
    if (!response.success) {
      throw new Error(response.error || 'Authentication failed');
    }
    
    // Store user info in localStorage
    localStorage.setItem('userEmail', response.user.email);
    localStorage.setItem('userRole', response.user.role);
    localStorage.setItem('userName', response.user.name);
    localStorage.setItem('userId', response.user.id);
    localStorage.setItem('sessionToken', response.token);
    
    return {
      success: true,
      user: response.user
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

// Logout function
export function logout() {
  try {
    // Call the API to invalidate the token
    logoutAPI();
  } catch (error) {
    console.error('Error during API logout:', error);
  }
  
  // Clear local storage regardless of API response
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  localStorage.removeItem('sessionToken');
  
  return { success: true };
}

// Check if user is authenticated
export async function isAuthenticated() {
  const token = localStorage.getItem('sessionToken');
  if (!token) return false;
  
  try {
    // Verify the token with the backend
    const result = await verifyToken();
    return result.valid === true;
  } catch (error) {
    console.error('Token verification error:', error);
    // If verification fails, clear the session
    logout();
    return false;
  }
}

// Get current user info
export function getCurrentUser() {
  const email = localStorage.getItem('userEmail');
  const role = localStorage.getItem('userRole');
  const name = localStorage.getItem('userName');
  const id = localStorage.getItem('userId');
  
  if (!email || !role) {
    return null;
  }
  
  return { id, email, role, name };
}

// Register a new user
export async function register(userData: any) {
  try {
    const response = await registerAPI(userData);
    
    if (!response.success) {
      throw new Error(response.error || 'Registration failed');
    }
    
    return {
      success: true,
      user: response.user
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}
