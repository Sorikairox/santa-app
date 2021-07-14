import { EmailSender } from '../library/sender/email';
import { SantaRequest } from './class';

export class SantaRequestSender extends EmailSender<SantaRequest> {

  public createMessageFromObjectArray(requestArray: Array<SantaRequest>): string {
    let messageContent = '';

    requestArray.forEach((request) => {
      messageContent += `Child name: ${request.childName}\n
      Child address: ${request.childAddress} \n
      Child request: ${request.content}\n`
    });

    return messageContent;
  }
}