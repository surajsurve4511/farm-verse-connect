
/**
 * Application configuration
 */

// Environment configuration
const config = {
  // API configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    timeout: 30000, // 30 seconds
  },
  
  // Feature flags
  features: {
    // Set to true when connected to real backend, false for mock data
    useProductionApi: import.meta.env.VITE_USE_PRODUCTION_API === 'true' || true,
  },
  
  // Auth configuration
  auth: {
    tokenExpiryDays: 7,
  }
};

export default config;
