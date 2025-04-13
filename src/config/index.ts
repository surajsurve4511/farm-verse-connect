
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
  
  // Database configuration
  database: {
    host: import.meta.env.DB_HOST || 'localhost',
    port: parseInt(import.meta.env.DB_PORT || '3306'),
    user: import.meta.env.DB_USER || 'root',
    password: import.meta.env.DB_PASSWORD || '',
    name: import.meta.env.DB_NAME || 'smartfarm',
  },
  
  // Feature flags
  features: {
    // Set to true when connected to real backend, false for mock data
    useProductionApi: import.meta.env.VITE_USE_PRODUCTION_API === 'true' || false,
  },
  
  // Auth configuration
  auth: {
    tokenExpiryDays: 7,
  }
};

export default config;
