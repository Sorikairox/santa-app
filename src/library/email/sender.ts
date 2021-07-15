import { Sender } from '../sender/interface';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { EmailClientService } from './client';

@Injectable()
export class EmailSender<T> implements Sender<T> {

  constructor(private configService: ConfigService, private emailClientService: EmailClientService) {

  }

  async sendMessage(message: string): Promise<any> {
      return this.emailClientService.sendEmail(
        this.configService.get('MAIL_RECIPIENT'),
        this.configService.get('MAIL_SENDER'),
        'Request list',
        message
      );
  }

  createMessageFromObjectArray(objArray: Array<T>): string {
    throw new Error('MethodShouldBeOverWritten');
  };
}