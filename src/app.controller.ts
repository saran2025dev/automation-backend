import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/test')
  test(@Body() step:Step[] ) {
    return this.appService.test(step);
  }
}
