import { Inject, Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailClientService {
  private transporter: Transporter;

  constructor(@Inject('MAILER_OPTIONS') options) {
    this.transporter = createTransport(options);
  }

  async sendEmail(from: string, to: string, subject: string, text: string, html?: string) {
    return this.transporter.sendMail({ from, to, subject, text, html });
  }
}