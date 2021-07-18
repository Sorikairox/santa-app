import { Injectable } from '@nestjs/common';
import { SantaRequestStore } from './store';
import { UserService } from '../user/service';
import * as moment from 'moment';
import { UserTooOld } from '../user/errors';
import { Interval } from '@nestjs/schedule';
import { SantaRequestSender } from './sender';

@Injectable()
export class SantaRequestService {

  constructor(private store: SantaRequestStore, private userService: UserService, private santaRequestSender: SantaRequestSender) {
  }

  async createSantaRequest(username: string, request: string) {
      const user = await this.userService.getUserByUsername(username);
      const profile = await this.userService.getProfileByUserId(user.uid);
      const birthDate = moment(profile.birthdate, 'yyyy/MM/dd');
      const now = moment();
      const timeDifference = now.diff(birthDate, 'year', true);
      if (timeDifference >= 10)
        throw new UserTooOld;
      await this.store.addToStore({childAddress: profile.address, content: request, childUsername: user.username});
  }

  @Interval(15000)
  async sendStoreContent(): Promise<void> {
    const requestArray = await this.store.getAllAndEmptyStore();
    if (requestArray.length > 0) {
      const message = this.santaRequestSender.createMessageFromObjectArray(requestArray);
      await this.santaRequestSender.sendMessage(message);
    }
  }
}