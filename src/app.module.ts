/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './library/email/module';
import { ScheduleModule } from '@nestjs/schedule';
import { SantaRequestModule } from './santa-request/module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  EmailModule.register({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    }
  ),
  ScheduleModule.forRoot(),
  SantaRequestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
