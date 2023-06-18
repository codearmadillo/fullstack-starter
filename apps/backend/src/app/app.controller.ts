import {Controller, Get, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import {MAuthApiGuard} from "@fullstack-starter/mauth-api";

@Controller()
export class AppController {

  @Get()
  getData() {
    return { status: 'ok' };
  }

  @UseGuards(MAuthApiGuard)
  @Get('locked')
  getUnauthorized() {
    return 'ok';
  }
}
