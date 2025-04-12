
import { getUserByEmail } from './dataService';
import { v4 as uuidv4 } from 'uuid';

// Simple password hashing - in production, use bcrypt
function hashPassword(password: string): string {
  // This is a placeholder for a real hashing function
  return password;
}

// Login function
export async function login(email: string, password: string) {
  try {
    const user = await getUserByEmail(email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // In a real app, compare hashed passwords
    if (user.password !== hashPassword(password)) {
      throw new Error('Invalid password');
    }
    
    // Generate session token
    const sessionToken = uuidv4();
    
    // Store user info in localStorage
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('sessionToken', sessionToken);
    
    return {
      success: true,
      user: {
        email: user.email,
        role: user.role,
        name: user.name
      }
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
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
  localStorage.removeItem('sessionToken');
  return { success: true };
}

// Check if user is authenticated
export function isAuthenticated() {
  const email = localStorage.getItem('userEmail');
  const role = localStorage.getItem('userRole');
  const sessionToken = localStorage.getItem('sessionToken');
  
  return !!email && !!role && !!sessionToken;
}

// Get current user info
export function getCurrentUser() {
  const email = localStorage.getItem('userEmail');
  const role = localStorage.getItem('userRole');
  
  if (!email || !role) {
    return null;
  }
  
  return { email, role };
}
