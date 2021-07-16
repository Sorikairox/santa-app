/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { UserService } from './service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
