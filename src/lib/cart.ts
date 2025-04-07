
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  farm: string;
}

// Get cart items from localStorage
export const getCartItems = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error("Error loading cart data:", error);
  }
  return [];
};

// Save cart items to localStorage
export const saveCartItems = (items: CartItem[]): void => {
  localStorage.setItem('cart', JSON.stringify(items));
  
  // Dispatch a storage event so other components can react to cart changes
  window.dispatchEvent(new Event('storage'));
};

// Add item to cart
export const addToCart = (item: Omit<CartItem, 'quantity'>): void => {
  const cartItems = getCartItems();
  
  // Check if item already exists in cart
  const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
  
  if (existingItemIndex !== -1) {
    // Update quantity if item exists
    cartItems[existingItemIndex].quantity += 1;
  } else {
    // Add new item if it doesn't exist
    cartItems.push({ ...item, quantity: 1 });
  }
  
  saveCartItems(cartItems);
};

// Update item quantity in cart
export const updateCartItemQuantity = (id: string, quantity: number): void => {
  if (quantity < 1) return;
  
  const cartItems = getCartItems();
  const updatedItems = cartItems.map(item =>
    item.id === id ? { ...item, quantity } : item
  );
  
  saveCartItems(updatedItems);
};

// Remove item from cart
export const removeFromCart = (id: string): void => {
  const cartItems = getCartItems();
  const updatedItems = cartItems.filter(item => item.id !== id);
  
  saveCartItems(updatedItems);
};

// Clear cart
export const clearCart = (): void => {
  saveCartItems([]);
};

// Get cart count
export const getCartCount = (): number => {
  return getCartItems().length;
};

// Get cart subtotal
export const getCartSubtotal = (): number => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};
