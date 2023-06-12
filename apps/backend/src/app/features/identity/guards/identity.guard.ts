import {CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, Scope} from '@nestjs/common';
import { Observable } from 'rxjs';
import {IdentityProvider} from "../providers/identity";

@Injectable()
export class IdentityGuard implements CanActivate {
  constructor(private readonly identity: IdentityProvider) { }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (this.identity.identity === null) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
