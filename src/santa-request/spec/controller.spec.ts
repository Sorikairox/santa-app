import { SantaRequestService } from '../service';
import SpyInstance = jest.SpyInstance;
import { SantaRequestController } from '../controller';

describe('Santa Request Controller Unit', () => {
  let controller: SantaRequestController;
  let service: SantaRequestService;
  let res;
  beforeAll(() => {
      service = new SantaRequestService(null, null, null);
      controller = new SantaRequestController(service);
      res = { render : () => {}};
  });

  describe('createSantaRequest', () => {
    let createRequestSpy : SpyInstance;
    beforeAll(() => {
        createRequestSpy = jest.spyOn(service, 'createSantaRequest').mockImplementation(async () => {});
    });
    it ('call service.createSantaRequest method', async () => {
        await controller.createSantaRequest(res,'name', 'request');
        expect(createRequestSpy).toBeCalledTimes(1);
    });
  })

});