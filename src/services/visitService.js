import { callCloudFunction } from '@/services/cloudFunctionService';

export function registerVisit() {
  return callCloudFunction('registerVisit');
}
