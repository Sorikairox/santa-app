import { EmailSender } from '../sender';
import { ConfigService } from '@nestjs/config';
import { EmailClientService } from '../client';

jest.mock('../client');

describe('Email Sender', () => {
  let emailSender: EmailSender<any>;
  let configService: ConfigService;
  let emailClient: EmailClientService;
  beforeAll(async () => {
    configService = new ConfigService();
    emailClient = new EmailClientService(null);
    emailSender = new EmailSender<any>(configService, emailClient);
  });

  describe('sendMessage', () => {
    beforeAll(() => {
      jest.spyOn(emailClient, 'sendEmail').mockImplementation(async () => {
        return { emailSent: true };
      })
    });
    it('return emailClient return value', async () => {
      const ret = await emailSender.sendMessage('message');
      expect(ret).toEqual({ emailSent: true });
    });
  });

  describe('createMessageFromObjectArray', () => {
    it ('throw error because method should be overwritten and never used as is', () => {
        expect( () => emailSender.createMessageFromObjectArray([])).toThrowError('MethodShouldBeOverWritten');
    });
  });

});