import { Sender } from './interface';

export abstract class EmailSender<T> implements Sender<T> {
  sendMessage(message: string): Promise<void> {
    return;
  }

  abstract createMessageFromObjectArray(objArray: Array<T>): string;
}