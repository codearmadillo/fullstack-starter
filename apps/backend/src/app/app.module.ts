import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';

import {AppController} from './app.controller';
import {IdentityModule} from "./features/identity/identity.module";
import {IdentityMiddleware} from "./features/identity/middleware/identity.middleware";

@Module({
  imports: [
    IdentityModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
