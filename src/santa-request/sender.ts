import { EmailSender } from '../library/email/sender';
import { SantaRequest } from './class/SantaRequest';
import { ConfigService } from '@nestjs/config';
import { EmailClientService } from '../library/email/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SantaRequestSender extends EmailSender<SantaRequest> {

  constructor(configService: ConfigService, emailClientService: EmailClientService) {
    super(configService, emailClientService);
  }

  public createMessageFromObjectArray(requestArray: Array<SantaRequest>): string {
    let messageContent = '';

    requestArray.forEach((request) => {
      messageContent += `Child name: ${request.childUsername}\n
      Child address: ${request.childAddress} \n
      Child request: ${request.content}\n`
    });

    return messageContent;
  }
}