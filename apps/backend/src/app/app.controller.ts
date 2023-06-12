import {Controller, Get, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import {IdentityGuard} from "./features/identity/guards/identity.guard";

@Controller()
export class AppController {

  @Get()
  getData() {
    return { status: 'ok' };
  }

  @Get('unauthorized')
  getUnauthorized() {
    return 'ok';
  }

  @Get('refresh')
  getRefresh() {
    return { status: 'refreshed' };
  }

  @Get('refreshUnauthorized')
  getRefreshUnauthorized() {
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
