import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { UserNotFound } from '../../user/error/user-not-found';
import { UserTooOld } from '../error/user-too-old';
import { ProfileNotFound } from '../../user/error/profile-not-found';

export class CreateSantaRequestFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message;
    if (exception instanceof UserNotFound) {
      message = `Sorry, we did not find your name on Santa's list. (We did not find an account with such username)`;
    } else if (exception instanceof ProfileNotFound) {
      message = `Sorry, we found your name on Santa's list but not your informations. (Your address is missing in your profile)`;
    } else if (exception instanceof UserTooOld) {
      message = `Sorry, you are too old for asking things to Santa.`;
    } else {
      message = 'Unknown error, please contact administrator: santa@northpole.com'
    }
    return response.status(400).render(
      'error',
      { message },
    );
  }
}