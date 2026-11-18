import { callCloudFunction } from '@/services/cloudFunctionService';

export const adminService = {
  getUsers: () => callCloudFunction('adminListUsers'),
  updateUser: (user) => callCloudFunction('adminUpdateUser', user),
  deleteUser: (uid) => callCloudFunction('adminDeleteUser', { uid }),
  getOrders: () => callCloudFunction('adminListOrders'),
  getVisitStatistics: () => callCloudFunction('adminGetVisitStatistics'),
};
