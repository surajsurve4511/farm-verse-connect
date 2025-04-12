
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

// Mock implementation for browser environment
const mockDb = {
  users: [
    {
      _id: "1",
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
      name: 'Admin User',
      createdAt: new Date()
    },
    {
      _id: "2",
      email: 'farmer@example.com',
      password: 'password123',
      role: 'farmer',
      name: 'Sample Farmer',
      createdAt: new Date()
    },
    {
      _id: "3",
      email: 'customer@example.com',
      password: 'password123',
      role: 'customer',
      name: 'Sample Customer',
      createdAt: new Date()
    }
  ],
  products: [
    {
      _id: "1",
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
      _id: "2",
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
      _id: "3",
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
  ],
  orders: [],
  farms: [],
  inventory: [],
  notifications: [],
  carts: [],
  reviews: [],
  payments: []
};

// Connection URL (stored but not used in browser mode)
let connectionString = 'mongodb://localhost:27017';

// Status flag
let isConnected = false;

/**
 * Connect to database - in browser, this just initializes the mock DB
 */
export async function connectToMongoDB() {
  try {
    console.log('Using mock database in browser environment');
    isConnected = true;
    return { collection: () => ({}) };
  } catch (error) {
    console.error('Error setting up mock database:', error);
    throw error;
  }
}

/**
 * Get DB function - in browser, returns mock operations
 */
export async function getDB() {
  // In browser, we return an object with methods that simulate MongoDB collection operations
  return {
    collection: (collectionName: string) => {
      return {
        // Find documents in collection
        find: (filter = {}) => ({
          toArray: async () => {
            const collection = mockDb[collectionName as keyof typeof mockDb] || [];
            return filterItems(collection, filter);
          },
          sort: () => ({
            toArray: async () => {
              const collection = mockDb[collectionName as keyof typeof mockDb] || [];
              return filterItems(collection, filter);
            }
          })
        }),
        
        // Find one document in collection
        findOne: async (filter: any) => {
          const collection = mockDb[collectionName as keyof typeof mockDb] || [];
          const items = filterItems(collection, filter);
          return items.length > 0 ? items[0] : null;
        },
        
        // Insert one document
        insertOne: async (doc: any) => {
          const newId = String(Date.now());
          const newDoc = { _id: newId, ...doc };
          
          const collection = mockDb[collectionName as keyof typeof mockDb];
          if (Array.isArray(collection)) {
            collection.push(newDoc);
          } else {
            console.error(`Collection ${collectionName} is not an array`);
          }
          
          return { insertedId: newId };
        },
        
        // Update one document
        updateOne: async (filter: any, update: any, options = {}) => {
          const collection = mockDb[collectionName as keyof typeof mockDb];
          if (!Array.isArray(collection)) {
            console.error(`Collection ${collectionName} is not an array`);
            return { matchedCount: 0, modifiedCount: 0 };
          }
          
          const index = collection.findIndex(item => {
            return Object.keys(filter).every(key => {
              if (key === '_id') {
                return item._id === filter._id;
              }
              return item[key] === filter[key];
            });
          });
          
          if (index !== -1) {
            // Handle $set operator
            if (update.$set) {
              collection[index] = { ...collection[index], ...update.$set };
            }
            
            // Handle $inc operator (for inventory)
            if (update.$inc) {
              Object.keys(update.$inc).forEach(key => {
                if (typeof collection[index][key] === 'number') {
                  collection[index][key] += update.$inc[key];
                } else {
                  collection[index][key] = update.$inc[key];
                }
              });
            }
            
            return { matchedCount: 1, modifiedCount: 1 };
          } else if (options.upsert) {
            // Handle upsert option
            const newDoc = { 
              _id: String(Date.now()),
              ...Object.keys(filter).reduce((acc, key) => ({ ...acc, [key]: filter[key] }), {}),
              ...update.$set || {} 
            };
            
            collection.push(newDoc);
            return { matchedCount: 0, modifiedCount: 0, upsertedCount: 1, upsertedId: newDoc._id };
          }
          
          return { matchedCount: 0, modifiedCount: 0 };
        },
        
        // Delete one document
        deleteOne: async (filter: any) => {
          const collection = mockDb[collectionName as keyof typeof mockDb];
          if (!Array.isArray(collection)) {
            console.error(`Collection ${collectionName} is not an array`);
            return { deletedCount: 0 };
          }
          
          const initialLength = collection.length;
          const newCollection = collection.filter(item => {
            return !Object.keys(filter).every(key => {
              if (key === '_id') {
                return item._id === filter._id;
              }
              if (key === 'id') {
                return item.id === filter.id;
              }
              return item[key] === filter[key];
            });
          });
          
          const deleted = initialLength - newCollection.length;
          
          if (deleted > 0) {
            // Replace the collection with the filtered version
            while (collection.length) collection.pop();
            newCollection.forEach(item => collection.push(item));
          }
          
          return { deletedCount: deleted };
        },
        
        // Count documents
        countDocuments: async () => {
          const collection = mockDb[collectionName as keyof typeof mockDb];
          return Array.isArray(collection) ? collection.length : 0;
        }
      };
    }
  };
}

// Helper function to filter items based on MongoDB-like filter object
function filterItems(items: any[], filter: any): any[] {
  return items.filter(item => {
    return Object.keys(filter).every(key => {
      // Handle _id field specifically
      if (key === '_id') {
        return item._id === filter._id;
      }
      
      // Handle id field specifically (for string IDs)
      if (key === 'id') {
        return item.id === filter.id;
      }
      
      // Handle other fields
      return item[key] === filter[key];
    });
  });
}

/**
 * Close connection - in browser, just resets the flag
 */
export async function closeMongoDBConnection() {
  isConnected = false;
  console.log('Mock MongoDB connection closed');
}

/**
 * Set connection string (stored for future backend integration)
 */
export function setMongoDBConnectionString(uri: string) {
  connectionString = uri;
  toast.success('MongoDB connection string updated for future server deployment');
  return { success: true, message: 'MongoDB connection string updated successfully' };
}

/**
 * Initialize database - in browser, just makes sure the mock data is set up
 */
export async function initializeDatabase() {
  try {
    console.log('Mock database initialized with sample data');
    return { success: true, message: 'Mock database initialized successfully' };
  } catch (error) {
    console.error('Error initializing mock database:', error);
    return { success: false, error: 'Failed to initialize mock database' };
  }
}
