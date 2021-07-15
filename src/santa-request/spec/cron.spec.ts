import { SantaRequestCronService } from '../cron';
import { SantaRequestStore } from '../store';
import { SantaRequestSender } from '../sender';
import SpyInstance = jest.SpyInstance;

describe('Santa Request Cron', () => {
  let cron: SantaRequestCronService;
  let store: SantaRequestStore;
  let sender: SantaRequestSender;
  beforeEach(() => {
    store = new SantaRequestStore();
    sender = new SantaRequestSender(null, null);

    cron = new SantaRequestCronService(store, sender);
  });

  describe('sendStoreContent', () => {
    let getAllSpy: SpyInstance;
    let sendMessageSpy: SpyInstance;
    let createMessageSpy: SpyInstance;

    afterEach(() => {
        getAllSpy.mockClear();
        sendMessageSpy.mockClear();
        createMessageSpy.mockClear();
    });
    it ('get store content, create message and call sendMessage if not empty', async () => {
      getAllSpy = jest.spyOn(store, 'getAllAndEmptyStore').mockImplementation(async () => [{ childName: 'name', childAddress: 'address', content: 'content'}]);
      sendMessageSpy = jest.spyOn(sender, 'sendMessage').mockImplementation(async () => {});
      createMessageSpy = jest.spyOn(sender, 'createMessageFromObjectArray').mockImplementation(() => 'message');
      await cron.sendStoreContent();

      expect(getAllSpy).toBeCalledTimes(1);
      expect(sendMessageSpy).toBeCalledTimes(1);
      expect(createMessageSpy).toBeCalledTimes(1);
    });
    it ('do not create message nor call sendMessage if store is empty', async () => {
      getAllSpy = jest.spyOn(store, 'getAllAndEmptyStore').mockImplementation(async () => []);
      sendMessageSpy = jest.spyOn(sender, 'sendMessage').mockImplementation(async () => {});

      await cron.sendStoreContent();

      expect(getAllSpy).toBeCalledTimes(1);
      expect(sendMessageSpy).toBeCalledTimes(0);
      expect(createMessageSpy).toBeCalledTimes(0);
    });
  });
});