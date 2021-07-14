import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { SantaRequestStore } from './store';
import { SantaRequestSender } from './sender';

@Injectable()
export class SantaRequestCronService {

  constructor(private store: SantaRequestStore, private santaRequestSender: SantaRequestSender) {
  }

  @Interval(1500)
  async sendStoreContent(): Promise<void> {
    const requestArray = await this.store.getAllAndEmptyStore();
    if (requestArray.length > 0) {
      const message = this.santaRequestSender.createMessageFromObjectArray(requestArray);
      await this.santaRequestSender.sendMessage(message);
    }
  }
}