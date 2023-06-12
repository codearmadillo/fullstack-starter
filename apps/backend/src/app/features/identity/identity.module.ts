import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';

import { IdentityService } from './services/identity.service';
import { IdentityController } from './controllers/identity.controller';
import {DatabaseModule} from "../../database/database.module";
import {IdentityProvider} from "./providers/identity";
import {IdentityGuard} from "./guards/identity.guard";
import {IdentityMiddleware} from "./middleware/identity.middleware";
import {MAuthApiModule} from "@fullstack-starter/mauth-api";

@Module({
  imports: [DatabaseModule, MAuthApiModule],
  providers: [IdentityService, IdentityProvider, IdentityGuard, IdentityMiddleware],
  controllers: [IdentityController],
  exports: [IdentityProvider]
})
export class IdentityModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(IdentityMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
