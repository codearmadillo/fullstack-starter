import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';

import {AppController} from './app.controller';
import {MAuthApiModule} from "@fullstack-starter/mauth-api";

@Module({
  imports: [ MAuthApiModule ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
