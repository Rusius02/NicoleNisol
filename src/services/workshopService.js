import { workshopRepository } from '@/infrastructure/firebase/workshopRepository';

export const workshopService = {
  getAll: () => workshopRepository.getAll(),
  create: (workshop) => workshopRepository.create(workshop),
  update: (id, workshop) => workshopRepository.update(id, workshop),
  delete: (id) => workshopRepository.delete(id),
};
