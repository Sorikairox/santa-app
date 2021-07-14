export interface IStore {
  addToStore(obj: any): Promise<void>;
  getAllAndEmptyStore(): Promise<Array<any>>;
}