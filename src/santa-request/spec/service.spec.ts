import { SantaRequestStore } from '../store';
import SpyInstance = jest.SpyInstance;
import { SantaRequestService } from '../service';
import { UserService } from '../../user/service';
import { UserTooOld } from '../../user/errors';

describe('Santa Request Service Unit', () => {
  let service: SantaRequestService;
  let store: SantaRequestStore;
  let addToStoreSpy: SpyInstance;
  let userService: UserService;

    beforeAll(() => {
      store = new SantaRequestStore();
      userService = new UserService(null);
      service = new SantaRequestService(store, userService);
      addToStoreSpy = jest.spyOn(store, 'addToStore');
      jest.spyOn(userService, 'getUserByUsername').mockImplementation(async () => ({} as any));
    });
  describe('createSantaRequest', () => {
    it ('call store.addToStore method if user is less than 10 years old', async () => {
      jest.spyOn(userService, 'getProfileByUserId').mockImplementation(async () => {
        return {
          birthdate : '2020/01/01'
        } as any;
      })
      await service.createSantaRequest('name', 'request');
      expect(addToStoreSpy).toHaveBeenCalled();
    });
    it ('thow UserIsToolOld when user is >= 10', async () => {
      jest.spyOn(userService, 'getProfileByUserId').mockImplementation(async () => {
        return {
          birthdate : '1997/01/01'
        } as any;
      })
      await expect(service.createSantaRequest('name', 'request')).rejects.toThrow(UserTooOld);
    });
  });
});