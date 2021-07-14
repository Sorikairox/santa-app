export interface Sender<T> {
  sendMessage(message: string): Promise<void>;
  createMessageFromObjectArray(objArray: Array<T>): string;
}