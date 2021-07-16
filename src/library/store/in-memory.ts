import { IStore } from './interface';

export class InMemoryStore<T> implements IStore {
  private store: Array<T> = [];
  async addToStore(obj: T): Promise<void> {
    this.store.push(obj);
  }

  async getAllAndEmptyStore(): Promise<Array<T>> {
    const actualStore = this.store.splice(0);
    this.store = [];
    return actualStore;
  }
}
