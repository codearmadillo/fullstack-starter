import {Controller, Get, Post, Body, HttpCode, HttpStatus, HttpException} from "@nestjs/common";
import {
  ExchangeRequestDto,
  ExchangeResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  RefreshRequestDto, RefreshResponseDto
} from "../model/dto";
import {isEmptyOrWhitespace} from "@fullstack-starter/shared";
import {IdentityService} from "../service/identity.service";

@Controller('mauth')
export class MAuthApiController {

  constructor(private readonly identityService: IdentityService) {
  }

  @Post('login')
  async postLogin(@Body() request: LoginRequestDto): Promise<LoginResponseDto> {
    if (isEmptyOrWhitespace(request?.email) || isEmptyOrWhitespace(request?.returnUrl)) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const [ login, token ] = await this.identityService.createLoginRequest(request.email);

    return {
      returnUrl: `${request.returnUrl}/login/exchange?login=${login}&token=${token}`
    };
  }

  @Post('exchange')
  async postExchange(@Body() request: ExchangeRequestDto): Promise<ExchangeResponseDto> {
    if (isEmptyOrWhitespace(request?.login) || isEmptyOrWhitespace(request?.token)) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const [ access, refresh ] = await this.identityService.exchangeTokens(request.login, request.token);

    return {
      accessToken: access,
      refreshToken: refresh
    }
  }

  @Post('refresh')
  async postRefresh(@Body() request: RefreshRequestDto): Promise<RefreshResponseDto> {
    if (isEmptyOrWhitespace(request?.refreshToken)) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const [ access, refresh ] = await this.identityService.refreshTokens(request.refreshToken);

    return {
      accessToken: access,
      refreshToken: refresh
    }
  }
}
