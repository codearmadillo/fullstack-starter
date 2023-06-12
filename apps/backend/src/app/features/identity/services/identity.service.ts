import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {createHash} from "crypto";
import {PrismaService} from "../../../database/database.provider";
import {Prisma, Session, User} from "@prisma/client";
import {environment} from "../../../../environments/environment";
import {IdentityProvider} from "../providers/identity";
@Injectable()
export class IdentityService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly identity: IdentityProvider
  ) { }
  async createInactiveUser(email: string): Promise<User> {
    const user: Prisma.UserCreateInput = {
      email
    };
    return this.prisma.user.create({data: user});
  }

  async findActiveSession(accessToken: string): Promise<Session> {
    const session = await this.prisma.session.findFirst({
      where: {
        sessionToken: accessToken
      }
    });
    if (session.updatedAt.getTime() + environment.session.lifetimeInMinutes * 60 * 1000 < new Date().getTime()) {
      return null;
    }
    return session;
  }
  async createLogin(email: string): Promise<[ login: string, token: string ]> {
    // Create user if it does not yet exist
    let user = await this.prisma.user.findFirst({
      where: {
        email: email
      }
    });
    if (user === null) {
      user = await this.createInactiveUser(email);
    }

    // Create login
    const login = await this.prisma.login.create({
      data: {
        token: this.createHash(`${email}-${new Date().getTime()}`),
        userUuid: user.uuid
      }
    });

    // Return it to controller which will delegate email
    return [ login.uuid, login.token ];
  }

  async handshake(loginUuid: string, token: string): Promise<[ access: string, refresh: string ]> {
    // find login
    const login = await this.prisma.login.findFirst({
      where: {
        uuid: loginUuid,
        token
      }
    });

    // if login does not exist - 401
    if (login === null) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    // find user
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        uuid: login.userUuid
      }
    });
    if (!user.activated) {
      await this.prisma.user.update({
        where: {
          uuid: user.uuid
        },
        data: {
          activated: true
        }
      })
    }

    // create new session
    const session = await this.prisma.session.create({
      data: {
        userUuid: login.userUuid,
        sessionToken: this.createHash(`session-${loginUuid}_${token}-token`),
        refreshToken: this.createHash(`refresh-${loginUuid}_${token}-token`)
      }
    });

    // de-activate the login (just remove it)
    await this.prisma.login.delete({
      where: {
        uuid: loginUuid
      }
    });

    // if login exists, create new session for the user, and return access/refresh tokens
    return [ session.sessionToken, session.refreshToken ];
  }

  async refresh(refreshToken: string): Promise<[ access: string, refresh: string ]> {
    // get current identity
    const identity = this.identity.identity;

    // get access token and find session
    const session = await this.prisma.session.findFirst({
      where: {
        uuid: identity.sessionUuid,
        sessionToken: identity.accessToken,
        refreshToken: refreshToken
      }
    });
    if (session === null) {
      return null;
    }

    // generate new refresh token
    const newRefreshToken = this.createHash(`refresh-${identity.userUuid}-${identity.sessionUuid}-${new Date().getTime()}-${Math.random() * 1000}`);
    const updatedSession = await this.prisma.session.update({
      where: {
        uuid: identity.sessionUuid,
      },
      data: {
        refreshToken: newRefreshToken
      }
    });

    return [ updatedSession.sessionToken, updatedSession.refreshToken ];
  }

  private createHash(input: string) {
    return createHash("sha256").update(input).digest('hex');
  }

}
