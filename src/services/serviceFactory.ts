
/**
 * Service Factory
 * This factory determines whether to use mock services or production services
 * based on configuration
 */

import config from '../config';

// Import mock services (for development/testing)
import * as mockDataService from './dataService';
import * as mockAuthService from './authService';

// Import production services (for real backend)
import * as productionDataService from './productionDataService';
import * as productionAuthService from './productionAuthService';

// Export the appropriate service based on configuration
export const dataService = config.features.useProductionApi 
  ? productionDataService 
  : mockDataService;

export const authService = config.features.useProductionApi
  ? productionAuthService
  : mockAuthService;

// Helper function to check if we're using production services
export const isUsingProductionServices = () => config.features.useProductionApi;
