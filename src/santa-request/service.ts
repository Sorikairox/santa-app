import { Injectable } from '@nestjs/common';
import { SantaRequestStore } from './store';

@Injectable()
export class SantaRequestService {

  constructor(private store: SantaRequestStore) {
  }

  async createSantaRequest(name: string, request: string) {
      await this.store.addToStore(null);
  }
}