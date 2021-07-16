import { Test, TestingModule } from '@nestjs/testing';
import { EmailSender } from '../../library/email/sender';
import { SantaRequestCronService } from '../cron';
import { EmailModule } from '../../library/email/module';
import { ConfigModule } from '@nestjs/config';
import SpyInstance = jest.SpyInstance;
import { SantaRequestStore } from '../store';
import { SantaRequestSender } from '../sender';
import { ScheduleModule } from '@nestjs/schedule';

jest.useFakeTimers();
describe('Santa Cron Integration', () => {
  let cronService: SantaRequestCronService;
  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), EmailModule.register({
          host: process.env.MAIL_HOST,
          port: Number(process.env.MAIL_PORT),
          secure: process.env.MAIL_SECURE === 'true',
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
          }
      }), ScheduleModule.forRoot()],
      controllers: [],
      providers: [EmailSender, SantaRequestCronService, SantaRequestStore, SantaRequestSender],
    }).compile();

    cronService = app.get<SantaRequestCronService>(SantaRequestCronService);
  });

  describe('cron mechanism', () => {
    let sendStoreContentSpy: SpyInstance;
    beforeAll(() => {
      sendStoreContentSpy = jest.spyOn(cronService, 'sendStoreContent');
    });
    it('should not have run before interval', () => {
      expect(sendStoreContentSpy).toBeCalledTimes(0);
    });
    it('should run after interval', () => {

      jest.runOnlyPendingTimers();
      expect(sendStoreContentSpy).toBeCalledTimes(1);
    });
  });

});