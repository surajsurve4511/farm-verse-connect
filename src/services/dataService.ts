
import { getDB, collections } from '@/lib/mongodb';

// User related operations
export async function getUserByEmail(email: string) {
  const db = await getDB();
  return db.collection(collections.users).findOne({ email });
}

export async function createUser(userData: any) {
  const db = await getDB();
  return db.collection(collections.users).insertOne(userData);
}

export async function updateUser(email: string, userData: any) {
  const db = await getDB();
  return db.collection(collections.users).updateOne(
    { email },
    { $set: userData }
  );
}

// Product related operations
export async function getAllProducts(filter = {}) {
  const db = await getDB();
  return db.collection(collections.products).find(filter).toArray();
}

export async function getProductById(id: string) {
  const db = await getDB();
  return db.collection(collections.products).findOne({ id });
}

export async function createProduct(productData: any) {
  const db = await getDB();
  return db.collection(collections.products).insertOne(productData);
}

export async function updateProduct(id: string, productData: any) {
  const db = await getDB();
  return db.collection(collections.products).updateOne(
    { id },
    { $set: productData }
  );
}

export async function deleteProduct(id: string) {
  const db = await getDB();
  return db.collection(collections.products).deleteOne({ id });
}

// Order related operations
export async function getAllOrders(filter = {}) {
  const db = await getDB();
  return db.collection(collections.orders).find(filter).toArray();
}

export async function getOrderById(id: string) {
  const db = await getDB();
  return db.collection(collections.orders).findOne({ id });
}

export async function createOrder(orderData: any) {
  const db = await getDB();
  return db.collection(collections.orders).insertOne(orderData);
}

export async function updateOrder(id: string, orderData: any) {
  const db = await getDB();
  return db.collection(collections.orders).updateOne(
    { id },
    { $set: orderData }
  );
}

// Inventory related operations
export async function getInventoryForProduct(productId: string) {
  const db = await getDB();
  return db.collection(collections.inventory).findOne({ productId });
}

export async function updateInventory(productId: string, quantity: number) {
  const db = await getDB();
  return db.collection(collections.inventory).updateOne(
    { productId },
    { $inc: { quantity } }
  );
}

// Notification related operations
export async function getNotificationsForUser(userId: string) {
  const db = await getDB();
  return db.collection(collections.notifications)
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function createNotification(notificationData: any) {
  const db = await getDB();
  return db.collection(collections.notifications).insertOne({
    ...notificationData,
    createdAt: new Date()
  });
}

export async function markNotificationAsRead(id: string) {
  const db = await getDB();
  return db.collection(collections.notifications).updateOne(
    { id },
    { $set: { read: true } }
  );
}
