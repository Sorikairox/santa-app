import { EmailSender } from '../library/email/sender';
import { SantaRequest } from './class';

export class SantaRequestSender extends EmailSender<SantaRequest> {

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