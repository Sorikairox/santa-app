import { IStore } from '../interface';
import { InMemoryStore } from '../in-memory';

describe('In Memory Store', () => {
  let store: IStore;
    beforeEach(() => {
      store = new InMemoryStore();
      store.addToStore({ prettyCoolProperty: 'perfect' });
    });

  it ('addStore add object into store', async () => {
    const storeContent = await store.getAllAndEmptyStore();

    expect(storeContent).toEqual([ { prettyCoolProperty: 'perfect' } ]);
  });

  it ('getAllAndEmptyStore get store content', async () => {
    const storeContent = await store.getAllAndEmptyStore();

    expect(storeContent).toEqual([ { prettyCoolProperty: 'perfect' } ]);
  });

  it ('getAllAndEmptyStore empty store content', async () => {
    await store.getAllAndEmptyStore();
    const storeContent = await store.getAllAndEmptyStore();

    expect(storeContent).toEqual([]);
  });



});