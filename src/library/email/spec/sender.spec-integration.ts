import { EmailSender } from '../sender';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from '../module';

describe('Email Sender Integration', () => {
  let emailSender: EmailSender<any>;
  let configService: ConfigService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), EmailModule.register({
          host: process.env.MAIL_HOST,
          port: Number(process.env.MAIL_PORT),
          secure: process.env.MAIL_SECURE === 'true',
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
          }
      })],
      controllers: [],
      providers: [EmailSender],
    }).compile();

    emailSender = app.get<EmailSender<any>>(EmailSender);
    configService = app.get<ConfigService>(ConfigService);
  });

  describe('sendMessage', () => {
    it('send and return message via nodemailer', async () => {
      let ret = await emailSender.sendMessage('message');
      expect(ret).toBeDefined();
    });
  });

});