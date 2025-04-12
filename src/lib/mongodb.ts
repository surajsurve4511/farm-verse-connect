
import { MongoClient, ObjectId, Filter, Document } from "mongodb";
import { toast } from "sonner";

// Define collection names
export const collections = {
  users: 'users',
  products: 'products',
  orders: 'orders',
  farms: 'farms',
  inventory: 'inventory',
  notifications: 'notifications',
  carts: 'carts',
  reviews: 'reviews',
  payments: 'payments'
};

// Helper function to convert string ID to ObjectId
export function toObjectId(id: string): ObjectId {
  try {
    return new ObjectId(id);
  } catch (error) {
    console.error('Invalid ObjectId format:', id, error);
    throw new Error('Invalid ObjectId format');
  }
}

// Helper function to safely query by ID (handles both ObjectId and string IDs)
export function createIdFilter(id: string): Filter<Document> {
  try {
    // Try to convert to ObjectId first
    return { _id: new ObjectId(id) };
  } catch (error) {
    // For development/compatibility, use string ID as a fallback
    console.warn('Using string ID instead of ObjectId:', id);
    return { id: id } as Filter<Document>;
  }
}

let client: MongoClient | null = null;
let isConnected = false;

/**
 * Connect to MongoDB
 */
export async function connectToMongoDB() {
  try {
    if (!client) {
      client = new MongoClient('mongodb://localhost:27017/farmer');
      await client.connect();
      console.log('Connected to MongoDB');
      isConnected = true;
    }
    return client.db();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    toast.error('Failed to connect to database');
    throw error;
  }
}

/**
 * Get DB instance
 */
export async function getDB() {
  if (!client || !isConnected) {
    return connectToMongoDB();
  }
  return client.db();
}

/**
 * Close MongoDB connection
 */
export async function closeMongoDBConnection() {
  try {
    if (client) {
      await client.close();
      client = null;
      isConnected = false;
      console.log('MongoDB connection closed');
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

/**
 * Initialize database with sample data if empty
 */
export async function initializeDatabase() {
  try {
    const db = await getDB();
    
    // Check if users collection is empty
    const usersCount = await db.collection(collections.users).countDocuments();
    
    if (usersCount === 0) {
      // Insert sample data
      await db.collection(collections.users).insertMany([
        {
          email: 'admin@example.com',
          password: 'password123',
          role: 'admin',
          name: 'Admin User',
          createdAt: new Date()
        },
        {
          email: 'farmer@example.com',
          password: 'password123',
          role: 'farmer',
          name: 'Sample Farmer',
          createdAt: new Date()
        }
      ]);
      
      console.log('Sample data initialized');
    }
    
    return { success: true, message: 'Database initialized successfully' };
  } catch (error) {
    console.error('Error initializing database:', error);
    return { success: false, error: 'Failed to initialize database' };
  }
}
