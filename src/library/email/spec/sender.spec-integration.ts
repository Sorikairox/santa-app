/* istanbul ignore file */

import { EmailSender } from '../sender';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from '../module';
import { EmailClientService } from '../client';

describe('Email Sender Integration', () => {
  let emailSender: EmailSender<any>;
  let configService: ConfigService;
  let emailClient: EmailClientService;
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
      providers: [],
    }).compile();

    configService = app.get<ConfigService>(ConfigService);
    emailClient = app.get<EmailClientService>(EmailClientService);
    emailSender = new class extends EmailSender<any> {
      createMessageFromObjectArray(objArray: Array<any>) {
        return objArray.toString();
    }}(configService, emailClient);
  });

  describe('sendMessage', () => {
    it('send and return message via nodemailer', async () => {
      const ret = await emailSender.sendMessage('message');
      expect(ret).toBeDefined();
    });
  });

});