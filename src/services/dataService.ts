import { getDB, collections, toObjectId, createIdFilter, ObjectId, Filter, Document } from '@/lib/mongodb';

// User related operations
export async function getUserByEmail(email: string) {
  const db = await getDB();
  return db.collection(collections.users).findOne({ email });
}

export async function getUserById(id: string) {
  const db = await getDB();
  return db.collection(collections.users).findOne(createIdFilter(id));
}

export async function createUser(userData: any) {
  const db = await getDB();
  return db.collection(collections.users).insertOne({
    ...userData,
    createdAt: new Date()
  });
}

export async function updateUser(id: string, userData: any) {
  const db = await getDB();
  const { _id, ...updateData } = userData; // Remove _id to avoid errors
  
  return db.collection(collections.users).updateOne(
    createIdFilter(id),
    { 
      $set: {
        ...updateData,
        updatedAt: new Date()
      } 
    }
  );
}

// Product related operations
export async function getAllProducts(filter = {}) {
  const db = await getDB();
  return db.collection(collections.products).find(filter).toArray();
}

export async function getProductById(id: string) {
  const db = await getDB();
  return db.collection(collections.products).findOne(createIdFilter(id));
}

export async function getProductsByFarmer(farmerId: string) {
  const db = await getDB();
  return db.collection(collections.products).find({ farmerId }).toArray();
}

export async function createProduct(productData: any) {
  const db = await getDB();
  return db.collection(collections.products).insertOne({
    ...productData,
    id: productData.id || `PROD-${Date.now()}`, // Generate a product ID if not provided
    createdAt: new Date()
  });
}

export async function updateProduct(id: string, productData: any) {
  const db = await getDB();
  const { _id, ...updateData } = productData; // Remove _id to avoid errors
  
  return db.collection(collections.products).updateOne(
    createIdFilter(id),
    { 
      $set: {
        ...updateData,
        updatedAt: new Date()
      } 
    }
  );
}

export async function deleteProduct(id: string) {
  const db = await getDB();
  return db.collection(collections.products).deleteOne(createIdFilter(id));
}

// Order related operations
export async function getAllOrders(filter = {}) {
  const db = await getDB();
  return db.collection(collections.orders).find(filter).toArray();
}

export async function getOrdersByUser(userId: string) {
  const db = await getDB();
  return db.collection(collections.orders).find({ userId }).toArray();
}

export async function getOrdersByFarmer(farmerId: string) {
  const db = await getDB();
  // Get orders containing products from this farmer
  return db.collection(collections.orders)
    .find({ 'items.farmerId': farmerId })
    .toArray();
}

export async function getOrderById(id: string) {
  const db = await getDB();
  return db.collection(collections.orders).findOne(createIdFilter(id));
}

export async function createOrder(orderData: any) {
  const db = await getDB();
  return db.collection(collections.orders).insertOne({
    ...orderData,
    id: `ORDER-${Date.now()}`, // Generate an order ID
    status: orderData.status || 'pending',
    createdAt: new Date()
  });
}

export async function updateOrder(id: string, orderData: any) {
  const db = await getDB();
  const { _id, ...updateData } = orderData; // Remove _id to avoid errors
  
  return db.collection(collections.orders).updateOne(
    createIdFilter(id),
    { 
      $set: {
        ...updateData,
        updatedAt: new Date()
      } 
    }
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
    { 
      $inc: { quantity },
      $set: { updatedAt: new Date() }
    },
    { upsert: true }
  );
}

// Notification related operations
export async function getNotificationsForUser(userId: string) {
  const db = await getDB();
  return db.collection(collections.notifications)
    .find({ userId })
    .toArray();
}

export async function createNotification(notificationData: any) {
  const db = await getDB();
  return db.collection(collections.notifications).insertOne({
    ...notificationData,
    read: false,
    createdAt: new Date()
  });
}

export async function markNotificationAsRead(id: string) {
  const db = await getDB();
  // Using a direct filter with proper typing
  const filter: Filter<Document> = { _id: toObjectId(id) };
  return db.collection(collections.notifications).updateOne(
    filter,
    { $set: { read: true, updatedAt: new Date() } }
  );
}

// Cart related operations
export async function getCartForUser(userId: string) {
  const db = await getDB();
  return db.collection(collections.carts).findOne({ userId });
}

export async function updateCart(userId: string, cartItems: any[]) {
  const db = await getDB();
  return db.collection(collections.carts).updateOne(
    { userId },
    {
      $set: {
        items: cartItems,
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );
}

export async function clearCart(userId: string) {
  const db = await getDB();
  return db.collection(collections.carts).updateOne(
    { userId },
    {
      $set: {
        items: [],
        updatedAt: new Date()
      }
    }
  );
}

// Review related operations
export async function getReviewsForProduct(productId: string) {
  const db = await getDB();
  return db.collection(collections.reviews)
    .find({ productId })
    .toArray();
}

export async function createReview(reviewData: any) {
  const db = await getDB();
  return db.collection(collections.reviews).insertOne({
    ...reviewData,
    createdAt: new Date()
  });
}

// Farm related operations
export async function getFarmByFarmerId(farmerId: string) {
  const db = await getDB();
  return db.collection(collections.farms).findOne({ farmerId });
}

export async function createOrUpdateFarm(farmData: any) {
  const db = await getDB();
  return db.collection(collections.farms).updateOne(
    { farmerId: farmData.farmerId },
    {
      $set: {
        ...farmData,
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );
}

// Payments related operations
export async function createPayment(paymentData: any) {
  const db = await getDB();
  return db.collection(collections.payments).insertOne({
    ...paymentData,
    status: paymentData.status || 'pending',
    createdAt: new Date()
  });
}

export async function getPaymentsByUser(userId: string) {
  const db = await getDB();
  return db.collection(collections.payments)
    .find({ userId })
    .toArray();
}

export async function getPaymentByOrderId(orderId: string) {
  const db = await getDB();
  return db.collection(collections.payments).findOne({ orderId });
}

export async function updatePayment(id: string, paymentData: any) {
  const db = await getDB();
  const { _id, ...updateData } = paymentData; // Remove _id to avoid errors
  
  return db.collection(collections.payments).updateOne(
    createIdFilter(id),
    { 
      $set: {
        ...updateData,
        updatedAt: new Date()
      } 
    }
  );
}
