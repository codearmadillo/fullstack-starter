import {Injectable, Scope} from '@nestjs/common';
import {Identity} from "../models/identity.model";

@Injectable({ scope: Scope.REQUEST })
export class IdentityProvider {

  private _identity: Identity = null;

  public get identity() {
    return this._identity;
  }
  public set identity(identity: Identity) {
    this._identity = identity;
  }
}
