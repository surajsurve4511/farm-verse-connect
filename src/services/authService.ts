
import { getUserByEmail } from './dataService';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

// Password hashing function using bcrypt
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare password with hashed password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Login function
export async function login(email: string, password: string) {
  try {
    const user = await getUserByEmail(email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // For development purposes, allow plain password comparison
    // In production, always use bcrypt comparison
    let isPasswordValid = false;
    
    if (user.password === password) {
      // Plain text comparison for development
      isPasswordValid = true;
    } else {
      // Bcrypt comparison for production
      try {
        isPasswordValid = await comparePassword(password, user.password);
      } catch (error) {
        console.error('Password comparison error:', error);
        isPasswordValid = false;
      }
    }
    
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    
    // Generate session token
    const sessionToken = uuidv4();
    
    // Store user info in localStorage
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userId', user._id?.toString() || user.id);
    localStorage.setItem('sessionToken', sessionToken);
    
    return {
      success: true,
      user: {
        id: user._id?.toString() || user.id,
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
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
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
    // Check if user already exists
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Hash password for security
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }
    
    // Create user in database
    const result = await createUser(userData);
    
    return {
      success: true,
      user: {
        id: result.insertedId.toString(),
        email: userData.email,
        role: userData.role,
        name: userData.name
      }
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

// Import at the top but implement at the bottom to avoid circular dependencies
import { createUser } from './dataService';
