import { Sender } from '../sender/interface';
import { ConfigService } from '@nestjs/config';
import { EmailClientService } from './client';

export abstract class EmailSender<T> implements Sender<T> {

  constructor(private configService: ConfigService, private emailClientService: EmailClientService) {

  }

  async sendMessage(message: string): Promise<any> {
    return this.emailClientService.sendEmail(
      this.configService.get('MAIL_SENDER'),
      this.configService.get('MAIL_RECIPIENT'),
      'Request list',
      message
    );
  }

  abstract createMessageFromObjectArray(objArray: Array<T>);
}
