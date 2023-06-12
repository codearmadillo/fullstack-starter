import {Body, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Post, UseGuards} from '@nestjs/common';
import {WaveRequestDto} from "../dto/wave.dto";
import {isEmptyOrWhitespace} from "../../../utils/type-checking.util";
import {IdentityService} from "../services/identity.service";
import { HandshakeRequestDto, HandshakeResponseDto} from "../dto/handshake.dto";
import {IdentityProvider} from "../providers/identity";
import {IdentityGuard} from "../guards/identity.guard";
import {RefreshRequestDto, RefreshResponseDto} from "../dto/refresh.dto";

@Controller('identity')
export class IdentityController {

  constructor(
    private readonly identityService: IdentityService,
    private readonly identity: IdentityProvider
  ) { }

  @UseGuards(IdentityGuard)
  @Get("me")
  async getMe() {
    return this.identity.identity ?? { status: 'no identity' };
  }

  @HttpCode(HttpStatus.OK)
  @Post("wave")
  async postWave(@Body() request: WaveRequestDto): Promise<any> {
    if (isEmptyOrWhitespace(request?.email) || isEmptyOrWhitespace(request?.callbackUrl)) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    // Create login
    const [ login, token ] = await this.identityService.createLogin(request.email);

    // Send email notification - for now return it
    return {
      redirectTo: `${request.callbackUrl}/login/exchange?login=${login}&token=${token}`
    }
  }

  @Post("handshake")
  async postHandshake(@Body() request: HandshakeRequestDto): Promise<HandshakeResponseDto> {
    if (isEmptyOrWhitespace(request?.login) || isEmptyOrWhitespace(request?.token)) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const [ access, refresh ] = await this.identityService.handshake(request.login, request.token);

    return {
      accessToken: access,
      refreshToken: refresh
    }
  }

  @Post("refresh")
  async postRefresh(@Body() request: RefreshRequestDto): Promise<RefreshResponseDto> {
    if (isEmptyOrWhitespace(request?.refreshToken)) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const tokens = await this.identityService.refresh(request.refreshToken);

    if (tokens === null) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    return {
      accessToken: tokens[0],
      refreshToken: tokens[1]
    }
  }
}
