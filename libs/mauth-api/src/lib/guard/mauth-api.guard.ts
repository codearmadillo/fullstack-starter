import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {IdentityService} from "../service/identity.service";
import {Observable} from "rxjs";

@Injectable()
export class MAuthApiGuard implements CanActivate {
  constructor(private readonly identityService: IdentityService) { }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (this.identityService.identity === null) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
