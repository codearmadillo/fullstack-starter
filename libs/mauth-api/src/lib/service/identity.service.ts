import {HttpException, HttpStatus, Injectable, Scope} from '@nestjs/common';
import {Identity} from "../model/identity";
import {DatabaseProvider} from "@fullstack-starter/database-api";
import {Session, User} from "@prisma/client";
import {createSha256Hash} from "@fullstack-starter/shared";

@Injectable({ scope: Scope.REQUEST })
export class IdentityService {

  private readonly LOGIN_REQUEST_LIFETIME_MS: number = 30 * 60 * 1000;
  private readonly SESSION_LIFETIME_MS: number = 30 * 60 * 1000;
  private _identity: Identity | null;

  constructor(
    private readonly database: DatabaseProvider
  ) {
    this._identity = null;
  }

  public setRequestIdentity(value: Identity | null) {
    this._identity = value;
  }

  public get identity() {
    return this._identity;
  }

  async createLoginRequest(email: string): Promise<[ loginGuid: string, loginToken: string]> {
    // find user by email. if user does not exist, create it
    let user = await this.findUserByEmail(email);
    if (user === null) {
      user = await this.createUser(email, false);
    }

    // create login request for user
    const login = await this.database.login.create({
      data: {
        token: createSha256Hash(`${user.uuid}-${new Date().getTime()}`),
        userUuid: user.uuid
      }
    });

    return [ login.uuid, login.token ];
  }

  async createUser(email: string, isActive: boolean = false): Promise<User> {
    return this.database.user.create({
      data: {
        email: email,
        activated: isActive
      }
    })
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.database.user.findFirst({
      where: {
        email
      }
    });
  }

  findUserByUuid(uuid: string): Promise<User | null> {
    return this.database.user.findFirst({
      where: {
        uuid
      }
    });
  }

  findSessionByAccessToken(token: string): Promise<Session | null> {
    return this.database.session.findFirst({
      where: {
        sessionToken: token
      }
    });
  }

  isSessionActive(session: Session) {
    return session.updatedAt.getTime() + this.SESSION_LIFETIME_MS < new Date().getTime();
  }

  async exchangeTokens(loginUuid: string, loginUniqueToken: string): Promise<[ accessToken: string, refreshToken: string ]> {
    // find login request
    const login = await this.database.login.findFirst({
      where: {
        uuid: loginUuid,
        token: loginUniqueToken
      }
    });
    if (login === null) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    // check if login is not older than maximum lifetime
    if (login?.createdAt?.getTime() + this.LOGIN_REQUEST_LIFETIME_MS > new Date().getTime()) {
      await this.deleteLoginRequestByUuid(login?.uuid as string);
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    // find associated user
    const user = await this.findUserByUuid(login.userUuid as string);

    // if user is not activated, activate it
    if (!user?.activated) {
      await this.database.user.update({
        where: {
          uuid: user?.uuid as string
        },
        data: {
          activated: true
        }
      })
    }

    // create new login session
    const session = await this.database.session.create({
      data: {
        userUuid: user?.uuid as string,
        sessionToken: createSha256Hash(`session-token_${user?.uuid}-${login.uuid}-${login.token}_${new Date().getTime()}`),
        refreshToken: createSha256Hash(`refresh-token_${user?.uuid}-${login.uuid}-${login.token}_${new Date().getTime()}`)
      }
    });

    // delete outdated login request
    await this.deleteLoginRequestByUuid(login?.uuid as string);

    // return tokens
    return [ session.sessionToken, session.refreshToken ];
  }

  async refreshTokens(refreshToken: string): Promise<[ accessToken: string, refreshToken: string ]> {
    const identity = this.identity;

    // if no identity is set - 401 (something went wrong when establishing identity)
    if (identity === null) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    // get session based on identity
    const session = await this.database.session.findFirst({
      where: {
        uuid: identity.sessionUuid,
        sessionToken: identity.sessionUuid,
        userUuid: identity.userUuid,
        refreshToken: refreshToken
      }
    });

    // if session isn't found - 401 (something went wrong)
    if (session === null) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    // generate new refresh token
    const updatedRefreshToken = createSha256Hash(`refresh-token_${session?.userUuid}-${session.sessionToken}_${refreshToken}_${new Date().getTime()}`)

    // update session
    const updatedSession = await this.database.session.update({
      where: {
        uuid: identity.sessionUuid
      },
      data: {
        refreshToken: updatedRefreshToken
      }
    });

    // return tokens
    return [ updatedSession.sessionToken, updatedSession.refreshToken ];
  }

  async deleteLoginRequestByUuid(uuid: string) {
    await this.database.login.delete({
      where: {
        uuid
      }
    })
  }

}
