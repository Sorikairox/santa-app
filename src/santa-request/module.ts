/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { UserModule } from '../user/module';
import { HttpModule } from '@nestjs/axios';
import { SantaRequestController } from './controller';
import { SantaRequestService } from './service';
import { SantaRequestStore } from './store';
import { ScheduleModule } from '@nestjs/schedule';
import { SantaRequestCronService } from './cron';
import { SantaRequestSender } from './sender';

@Module({
  imports: [HttpModule, UserModule, ScheduleModule],
  controllers: [SantaRequestController],
  providers: [SantaRequestService, SantaRequestStore, SantaRequestCronService, SantaRequestSender],
})
export class SantaRequestModule {}
