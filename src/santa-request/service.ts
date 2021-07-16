import { Injectable } from '@nestjs/common';
import { SantaRequestStore } from './store';
import { UserService } from '../user/service';

@Injectable()
export class SantaRequestService {

  constructor(private store: SantaRequestStore, private userService: UserService) {
  }

  async createSantaRequest(name: string, request: string) {
      await this.store.addToStore(null);
  }
}