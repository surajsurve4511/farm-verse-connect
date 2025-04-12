
import { MongoClient, ServerApiVersion } from 'mongodb';

// Connection URL - this should be provided by the user
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

/**
 * Connect to MongoDB
 */
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
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
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

/**
 * Get MongoDB database instance
 */
export async function getDB() {
  try {
    // Check if client is connected, if not connect
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }
    return client.db(dbName);
  } catch (error) {
    console.error('Error getting database:', error);
    throw error;
  }
}

// Database schemas/collections
export const collections = {
  users: 'users',
  products: 'products',
  orders: 'orders',
  farms: 'farms',
  inventory: 'inventory',
  notifications: 'notifications'
};

// Set your MongoDB connection string here (will be blank for the user to fill in)
export function setMongoDBConnectionString(uri: string) {
  connectionString = uri;
}
