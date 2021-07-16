import { SantaRequestStore } from '../store';
import SpyInstance = jest.SpyInstance;
import { SantaRequestService } from '../service';
import { UserService } from '../../user/service';

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
    });
    describe('createSantaRequest', () => {
        it ('call store.addToStore method', () => {
            service.createSantaRequest('name', 'request');
            expect(addToStoreSpy).toHaveBeenCalled();
        });
    });
});