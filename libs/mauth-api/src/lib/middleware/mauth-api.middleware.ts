import {Injectable, NestMiddleware} from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import {IdentityService} from "../service/identity.service";

@Injectable()
export class MAuthApiMiddleware implements NestMiddleware {
  constructor(private readonly identityService: IdentityService) {
  }
  async use(req: Request, res: Response, next: NextFunction) {
    // attempt to get auth token from header
    const accessTokenArray = req.headers.authorization?.split(' ');
    if (accessTokenArray === null || accessTokenArray === undefined || accessTokenArray?.length <= 1 || accessTokenArray[0] !== 'Bearer') {
      return next();
    }

    // extract token
    const accessToken = accessTokenArray[1].trim();

    if (accessToken === null || accessToken === undefined) {
      return next();
    }

    // attempt to find session
    const session = await this.identityService.findSessionByAccessToken(accessToken);
    if (session === null || session === undefined || !this.identityService.isSessionActive(session)) {
      return next();
    }

    // store identity
    this.identityService.setRequestIdentity({
      userUuid: session?.userUuid as string,
      sessionUuid: session?.uuid as string,
      accessToken: session?.sessionToken as string,
    });

    return next();
  }
}
