
/**
 * Service Factory
 * This module handles the creation and export of service instances
 * based on the environment (production/development)
 */

import * as productionAuthService from './productionAuthService';
import * as productionDataService from './productionDataService';
import * as authServiceImpl from './authService';
import * as dataServiceImpl from './dataService';

// Determine if we should use production services
const useProductionServices = import.meta.env.VITE_USE_PRODUCTION_SERVICES === 'true';

// Export the appropriate service implementations
export const authService = useProductionServices ? productionAuthService : authServiceImpl;
export const dataService = useProductionServices ? productionDataService : dataServiceImpl;

// Export a function to get the right service based on environment
export function getService(name: 'auth' | 'data') {
  switch (name) {
    case 'auth':
      return authService;
    case 'data':
      return dataService;
    default:
      throw new Error(`Unknown service: ${name}`);
  }
}
