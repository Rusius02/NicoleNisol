import { callCloudFunction } from '@/services/cloudFunctionService';

export const paymentService = {
  estimateShipping: (address) => callCloudFunction('estimateShipping', address),
  createPaymentIntent: (checkout) => callCloudFunction('createPaymentIntent', checkout),
};
