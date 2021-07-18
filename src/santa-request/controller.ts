import { Body, Controller, Get, Post, Render, Res, UseFilters } from '@nestjs/common';
import { SantaRequestService } from './service';
import { Response } from 'express';
import { CreateSantaRequestFilter } from './exception-filter/createSantaRequest';

@Controller()
export class SantaRequestController {
  constructor(private readonly santaRequestService: SantaRequestService) {}

  @UseFilters(new CreateSantaRequestFilter())
  @Post()
  async createSantaRequest(@Res() res: Response, @Body('username') username: string, @Body('request') request: string) {
      if (request.length > 100) {
        return res.render('index', { message: 'Your request is too long. Please enter less than 100 characters', username, request});
      }
      await this.santaRequestService.createSantaRequest(username, request);
      return res.render(
        'success'
      );
  }

  @Get()
  @Render('index')
  displaySantaRequestForm() {}
}
