import { SantaRequestStore } from '../store';
import SpyInstance = jest.SpyInstance;
import { SantaRequestService } from '../service';

describe('Santa Request Service Unit', () => {
    let service: SantaRequestService;
    let store: SantaRequestStore;
    let addToStoreSpy: SpyInstance;

    beforeAll(() => {
      store = new SantaRequestStore();
      service = new SantaRequestService(store);
      addToStoreSpy = jest.spyOn(store, 'addToStore');
    });
    describe('createSantaRequest', () => {
        it ('call store.addToStore method', () => {
            expect(addToStoreSpy).toHaveBeenCalled();
        });
    });
});