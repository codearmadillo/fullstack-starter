import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {DatabaseModule} from "@fullstack-starter/database-api";
import {MAuthApiMiddleware} from "./middleware/mauth-api.middleware";
import {MAuthApiController} from "./controller/mauth-api.controller";
import {IdentityService} from "./service/identity.service";
import {MAuthApiGuard} from "./guard/mauth-api.guard";

@Module({
  imports: [ DatabaseModule ],
  controllers: [ MAuthApiController ],
  providers: [ IdentityService, MAuthApiGuard, MAuthApiMiddleware ],
  exports: [ MAuthApiGuard ],
})
export class MAuthApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(MAuthApiMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
