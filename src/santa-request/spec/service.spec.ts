import { SantaRequestStore } from '../store';
import SpyInstance = jest.SpyInstance;
import { SantaRequestService } from '../service';
import { UserService } from '../../user/service';
import { SantaRequestSender } from '../sender';
import { UserTooOld } from '../error/user-too-old';

describe('Santa Request Service Unit', () => {
  let service: SantaRequestService;
  let store: SantaRequestStore;
  let addToStoreSpy: SpyInstance;
  let userService: UserService;
  let sender: SantaRequestSender;

    beforeAll(() => {
      store = new SantaRequestStore();
      userService = new UserService(null);
      sender = new SantaRequestSender(null, null);
      service = new SantaRequestService(store, userService, sender);
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
    it ('throw UserIsToolOld when user is >= 10', async () => {
      jest.spyOn(userService, 'getProfileByUserId').mockImplementation(async () => {
        return {
          birthdate : '1997/01/01'
        } as any;
      })
      await expect(service.createSantaRequest('name', 'request')).rejects.toThrow(UserTooOld);
    });
  });
  describe('sendStoreContent', () => {
    let getAllSpy: SpyInstance;
    let sendMessageSpy: SpyInstance;
    let createMessageSpy: SpyInstance;

    afterEach(() => {
      getAllSpy.mockClear();
      sendMessageSpy.mockClear();
      createMessageSpy.mockClear();
      addToStoreSpy.mockClear();
    });
    it ('get store content, create message and call sendMessage if not empty', async () => {
      getAllSpy = jest.spyOn(store, 'getAllAndEmptyStore').mockImplementation(async () => [{ childUsername: 'name', childAddress: 'address', content: 'content'}]);
      sendMessageSpy = jest.spyOn(sender, 'sendMessage').mockImplementation(async () => {});
      createMessageSpy = jest.spyOn(sender, 'createMessageFromObjectArray').mockImplementation(() => 'message');
      await service.sendStoreContent();

      expect(getAllSpy).toBeCalledTimes(1);
      expect(sendMessageSpy).toBeCalledTimes(1);
      expect(createMessageSpy).toBeCalledTimes(1);
    });
    it ('do not create message nor call sendMessage if store is empty', async () => {
      getAllSpy = jest.spyOn(store, 'getAllAndEmptyStore').mockImplementation(async () => []);
      sendMessageSpy = jest.spyOn(sender, 'sendMessage').mockImplementation(async () => {});

      await service.sendStoreContent();

      expect(getAllSpy).toBeCalledTimes(1);
      expect(sendMessageSpy).toBeCalledTimes(0);
      expect(createMessageSpy).toBeCalledTimes(0);
    });
    it ('put request back in store if sendMessage fails', async () => {
      addToStoreSpy = jest.spyOn(store, 'addToStore').mockImplementation(async () => {});
      getAllSpy = jest.spyOn(store, 'getAllAndEmptyStore').mockImplementation(async () => [{ childUsername: 'name', childAddress: 'address', content: 'content'}, { childUsername: 'name', childAddress: 'address', content: 'content'}]);
      sendMessageSpy = jest.spyOn(sender, 'sendMessage').mockImplementation(async () => {
        throw new Error()
      });

      await service.sendStoreContent();

      expect(getAllSpy).toBeCalledTimes(1);
      expect(sendMessageSpy).toBeCalledTimes(1);
      expect(createMessageSpy).toBeCalledTimes(1);
      expect(addToStoreSpy).toBeCalledTimes(2);
    });
  });
});