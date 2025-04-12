
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

// Mock ObjectId for browser compatibility
export class ObjectId {
  private id: string;
  
  constructor(id?: string) {
    this.id = id || Math.random().toString(36).substring(2, 15);
  }
  
  toString() {
    return this.id;
  }
  
  equals(otherId: ObjectId) {
    return this.toString() === otherId.toString();
  }
}

// Helper function to convert string ID to ObjectId
export function toObjectId(id: string): ObjectId {
  try {
    return new ObjectId(id);
  } catch (error) {
    console.error('Invalid ObjectId format:', id, error);
    throw new Error('Invalid ObjectId format');
  }
}

// Helper for typed filters
export type Filter<T> = Record<string, any>;
export type Document = Record<string, any>;

// Helper function to safely query by ID
export function createIdFilter(id: string): Filter<Document> {
  try {
    return { _id: new ObjectId(id) };
  } catch (error) {
    console.warn('Using string ID instead of ObjectId:', id);
    return { id: id } as Filter<Document>;
  }
}

// In-memory database for browser compatibility
const inMemoryDB: Record<string, any[]> = {
  users: [
    {
      _id: new ObjectId(),
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
      name: 'Admin User',
      createdAt: new Date()
    },
    {
      _id: new ObjectId(),
      email: 'farmer@example.com',
      password: 'password123',
      role: 'farmer',
      name: 'Sample Farmer',
      createdAt: new Date()
    }
  ],
  products: [],
  orders: [],
  farms: [],
  inventory: [],
  notifications: [],
  carts: [],
  reviews: [],
  payments: []
};

// Simulate MongoDB collection methods
class Collection {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async find(filter: Filter<Document> = {}) {
    console.log(`Finding in ${this.collectionName} with filter:`, filter);
    const collection = inMemoryDB[this.collectionName] || [];
    
    // Simple filtering logic
    const results = collection.filter(item => {
      for (const key in filter) {
        if (key === '_id' && filter[key] instanceof ObjectId) {
          if (!item._id || !(item._id instanceof ObjectId) || !item._id.equals(filter[key])) {
            return false;
          }
        } else if (filter[key] !== item[key]) {
          return false;
        }
      }
      return true;
    });
    
    return {
      toArray: async () => results
    };
  }

  async findOne(filter: Filter<Document> = {}) {
    const results = await this.find(filter).then(cursor => cursor.toArray());
    return results[0] || null;
  }

  async insertOne(document: any) {
    console.log(`Inserting into ${this.collectionName}:`, document);
    if (!document._id) {
      document._id = new ObjectId();
    }
    
    if (!inMemoryDB[this.collectionName]) {
      inMemoryDB[this.collectionName] = [];
    }
    
    inMemoryDB[this.collectionName].push(document);
    return {
      insertedId: document._id,
      acknowledged: true
    };
  }

  async insertMany(documents: any[]) {
    console.log(`Inserting multiple into ${this.collectionName}:`, documents);
    const results = await Promise.all(documents.map(doc => this.insertOne(doc)));
    return {
      insertedIds: results.map(r => r.insertedId),
      acknowledged: true
    };
  }

  async updateOne(filter: Filter<Document>, update: any, options: any = {}) {
    console.log(`Updating in ${this.collectionName} with filter:`, filter);
    const results = await this.find(filter).then(cursor => cursor.toArray());
    
    if (results.length > 0) {
      const item = results[0];
      const index = inMemoryDB[this.collectionName].indexOf(item);
      
      if (update.$set) {
        for (const key in update.$set) {
          item[key] = update.$set[key];
        }
      }
      
      if (update.$inc) {
        for (const key in update.$inc) {
          item[key] = (item[key] || 0) + update.$inc[key];
        }
      }
      
      inMemoryDB[this.collectionName][index] = item;
      
      return {
        modifiedCount: 1,
        acknowledged: true
      };
    } else if (options.upsert) {
      // For upsert, create new document with filter fields + $set fields
      const newDoc = { ...filter };
      if (update.$set) {
        Object.assign(newDoc, update.$set);
      }
      await this.insertOne(newDoc);
      return {
        modifiedCount: 0,
        upsertedCount: 1,
        acknowledged: true
      };
    }
    
    return {
      modifiedCount: 0,
      acknowledged: true
    };
  }

  async deleteOne(filter: Filter<Document>) {
    console.log(`Deleting from ${this.collectionName} with filter:`, filter);
    const results = await this.find(filter).then(cursor => cursor.toArray());
    
    if (results.length > 0) {
      const item = results[0];
      const index = inMemoryDB[this.collectionName].indexOf(item);
      inMemoryDB[this.collectionName].splice(index, 1);
      
      return {
        deletedCount: 1,
        acknowledged: true
      };
    }
    
    return {
      deletedCount: 0,
      acknowledged: true
    };
  }

  async countDocuments(filter: Filter<Document> = {}) {
    const results = await this.find(filter).then(cursor => cursor.toArray());
    return results.length;
  }
}

// Mock DB class
class DB {
  collection(collectionName: string) {
    return new Collection(collectionName);
  }
}

let dbInstance: DB | null = null;
let isConnected = false;

/**
 * Connect to MongoDB (browser-compatible mock)
 */
export async function connectToMongoDB() {
  try {
    if (!dbInstance) {
      console.log('Creating in-memory database for browser');
      dbInstance = new DB();
      isConnected = true;
      
      // Log initialization
      console.log('Connected to in-memory database');
      toast.success('Connected to in-memory database');
    }
    return dbInstance;
  } catch (error) {
    console.error('Database connection error:', error);
    toast.error('Failed to connect to database');
    throw error;
  }
}

/**
 * Get DB instance
 */
export async function getDB() {
  if (!dbInstance || !isConnected) {
    return connectToMongoDB();
  }
  return dbInstance;
}

/**
 * Close MongoDB connection
 */
export async function closeMongoDBConnection() {
  try {
    if (dbInstance) {
      dbInstance = null;
      isConnected = false;
      console.log('Database connection closed');
    }
  } catch (error) {
    console.error('Error closing database connection:', error);
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
