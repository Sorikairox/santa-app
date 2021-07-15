export interface Sender<T> {
  sendMessage(message: string): Promise<boolean>;
  createMessageFromObjectArray(objArray: Array<T>): string;
}