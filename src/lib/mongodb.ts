
import { MongoClient, ServerApiVersion, Db } from 'mongodb';

// Connection URL - this will be provided by the user
let connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017';

// Create a MongoDB client
const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Database Name
const dbName = 'farmverse';

// Variable to maintain the connection status
let isConnected = false;
let db: Db | null = null;

/**
 * Connect to MongoDB
 */
export async function connectToMongoDB() {
  try {
    if (!isConnected) {
      await client.connect();
      db = client.db(dbName);
      isConnected = true;
      console.log('Connected to MongoDB');
    }
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

/**
 * Close MongoDB connection
 */
export async function closeMongoDBConnection() {
  try {
    if (isConnected) {
      await client.close();
      isConnected = false;
      db = null;
      console.log('MongoDB connection closed');
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

/**
 * Get MongoDB database instance
 */
export async function getDB() {
  if (!isConnected || !db) {
    db = await connectToMongoDB();
  }
  return db;
}

// Database schemas/collections
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

// Set your MongoDB connection string here (will be blank for the user to fill in)
export function setMongoDBConnectionString(uri: string) {
  connectionString = uri;
  // Reset connection status to force a new connection with updated URI
  isConnected = false;
  db = null;
  return { success: true, message: 'MongoDB connection string updated successfully' };
}

// Initialize database with default data
export async function initializeDatabase() {
  try {
    const db = await getDB();
    
    // Check if users collection already has data
    const usersCount = await db.collection(collections.users).countDocuments();
    
    if (usersCount === 0) {
      // Create default admin user
      await db.collection(collections.users).insertOne({
        email: 'admin@example.com',
        password: 'password123', // In production, this should be hashed
        role: 'admin',
        name: 'Admin User',
        createdAt: new Date()
      });
      
      // Create a sample farmer
      await db.collection(collections.users).insertOne({
        email: 'farmer@example.com',
        password: 'password123',
        role: 'farmer',
        name: 'Sample Farmer',
        createdAt: new Date()
      });
      
      // Create a sample customer
      await db.collection(collections.users).insertOne({
        email: 'customer@example.com',
        password: 'password123',
        role: 'customer',
        name: 'Sample Customer',
        createdAt: new Date()
      });
      
      console.log('Default users created successfully');
    }
    
    // Check if products collection has data
    const productsCount = await db.collection(collections.products).countDocuments();
    
    if (productsCount === 0) {
      // Create sample products
      await db.collection(collections.products).insertMany([
        {
          id: "PROD-001",
          name: "Organic Tomatoes",
          price: 4.99,
          unit: "kg",
          category: "Vegetables",
          organic: true,
          inStock: 45,
          image: "/placeholder.svg",
          farmerId: "farmer@example.com",
          description: "Fresh organic tomatoes grown locally"
        },
        {
          id: "PROD-002",
          name: "Fresh Carrots Bundle",
          price: 3.49,
          unit: "bundle",
          category: "Vegetables",
          organic: true,
          inStock: 12,
          image: "/placeholder.svg",
          farmerId: "farmer@example.com",
          description: "Bundle of fresh orange carrots"
        },
        {
          id: "PROD-003",
          name: "Grass-fed Beef",
          price: 15.99,
          unit: "kg",
          category: "Meat",
          organic: false,
          inStock: 8,
          image: "/placeholder.svg",
          farmerId: "farmer@example.com",
          description: "Locally raised grass-fed beef"
        }
      ]);
      
      console.log('Sample products created successfully');
    }
    
    return { success: true, message: 'Database initialized successfully' };
  } catch (error) {
    console.error('Error initializing database:', error);
    return { success: false, error: 'Failed to initialize database' };
  }
}
