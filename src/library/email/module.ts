import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailClientService } from './client';

@Global()
@Module({})
export class EmailModule {
  static register(options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'MAILER_OPTIONS',
          useValue: options,
        },
        EmailClientService,
      ],
      exports: [EmailClientService],
    };
  }
}
