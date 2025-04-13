
import { getUserByEmail } from './dataService';
import { v4 as uuidv4 } from 'uuid';

// Simple password hashing mock for browser environment
// This will be used when bcryptjs isn't available
const mockBcrypt = {
  async genSalt() {
    return "mock_salt";
  },
  async hash(password: string) {
    // Simple encoding for development only - NOT secure!
    return btoa(`${password}_hashed`);
  },
  async compare(password: string, hashedPassword: string) {
    const expectedHash = btoa(`${password}_hashed`);
    return expectedHash === hashedPassword;
  }
};

// Try to use real bcrypt, fallback to mock implementation for browser
let bcrypt: any;
try {
  // Dynamic import to avoid build errors
  import('bcryptjs').then(module => {
    bcrypt = module.default;
  }).catch(() => {
    console.warn('bcryptjs not available, using mock implementation');
    bcrypt = mockBcrypt;
  });
} catch (error) {
  console.warn('bcryptjs not available, using mock implementation');
  bcrypt = mockBcrypt;
}

// Hardcoded admin user for local development
const adminUser = {
  _id: "admin123",
  id: "admin123",
  email: "admin@example.com",
  password: "adminpassword123", // In production, this would be hashed
  name: "Admin User",
  role: "admin"
};

// Password hashing function using bcrypt or mock
export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (error) {
    console.warn('Error hashing password, using mock implementation', error);
    return mockBcrypt.hash(password);
  }
}

// Compare password with hashed password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.warn('Error comparing passwords, using mock implementation', error);
    return mockBcrypt.compare(password, hashedPassword);
  }
}

// Login function
export async function login(email: string, password: string) {
  try {
    // Special case for admin user
    if (email === adminUser.email && password === adminUser.password) {
      // Generate session token
      const sessionToken = uuidv4();
      
      // Store user info in localStorage
      localStorage.setItem('userEmail', adminUser.email);
      localStorage.setItem('userRole', adminUser.role);
      localStorage.setItem('userName', adminUser.name);
      localStorage.setItem('userId', adminUser.id);
      localStorage.setItem('sessionToken', sessionToken);
      
      return {
        success: true,
        user: {
          id: adminUser.id,
          email: adminUser.email,
          role: adminUser.role,
          name: adminUser.name
        }
      };
    }
    
    // For other users, get from database
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

// Import at the bottom but implement at the bottom to avoid circular dependencies
import { createUser } from './dataService';
