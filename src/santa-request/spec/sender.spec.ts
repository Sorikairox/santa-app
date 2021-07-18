import { SantaRequestSender } from '../sender';
import { SantaRequest } from '../class/SantaRequest';

describe('Santa Request Sender', () => {
  let sender: SantaRequestSender;

  beforeAll(() => {
    sender = new SantaRequestSender(null, null);
  });

  describe('createMessageFromObjectArray', () => {
    it ('returns message with santa requests', () => {
        const requestArray: Array<SantaRequest> = [
          {
            content: '1st content',
            childAddress: 'nice address',
            childUsername: 'cool name'
          }
        ];
        const message = sender.createMessageFromObjectArray(requestArray);

        expect(message).toEqual(`Child name: cool name\n
      Child address: nice address \n
      Child request: 1st content\n`)
    });
  })
});