import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { SantaRequestService } from './service';
import { Response } from 'express';
import { ProfileNotFound, UserNotFound, UserTooOld } from '../user/errors';

@Controller()
export class SantaRequestController {
  constructor(private readonly santaRequestService: SantaRequestService) {}

  @Post()
  async createSantaRequest(@Res() res: Response, @Body('username') username: string, @Body('request') request: string) {
    try {
      if (request.length > 100) {
        return res.render('index', { message: 'Your request is too long. Please enter less than 100 characters', username, request});
      }
      await this.santaRequestService.createSantaRequest(username, request);
      return res.render(
        'success'
      );
    } catch (e) {
      let message;
      if (e instanceof UserNotFound) {
        message = `Sorry, we did not find your name on Santa's list. (We did not find an account with such username)`;
      } else if (e instanceof ProfileNotFound) {
        message = `Sorry, we found your name on Santa's list but not your informations. (Your address is missing in your profile)`;
      } else if (e instanceof UserTooOld) {
        message = `Sorry, you are too old for asking things to Santa.`;
      } else {
        message = 'Unknown error, please contact administrator: santa@northpole.com'
      }
      return res.status(400).render(
        'error',
        { message },
      );
    }
  }

  @Get()
  @Render('index')
  displaySantaRequestForm() {}
}
