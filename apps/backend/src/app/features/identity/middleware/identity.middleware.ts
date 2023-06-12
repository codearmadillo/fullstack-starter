import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {IdentityProvider} from "../providers/identity";
import {IdentityService} from "../services/identity.service";

/**
 * Runs at the beginning of the request, and stores session/user information as identity for the duration of the request
 */

@Injectable()
export class IdentityMiddleware implements NestMiddleware {
  constructor(private readonly identityService: IdentityService, private readonly identityProvider: IdentityProvider) {
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization;
    if (accessToken === null || accessToken === undefined) {
      return next();
    }

    // find active session
    const session = await this.identityService.findActiveSession(accessToken);
    if (session === null || session === undefined) {
      return next();
    }

    // store identity
    this.identityProvider.identity = {
      userUuid: session.userUuid,
      sessionUuid: session.uuid,
      accessToken: session.sessionToken
    }

    next();
  }
}
