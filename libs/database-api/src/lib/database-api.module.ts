import {Module, NestModule} from '@nestjs/common';
import {DatabaseProvider} from "./database-api.provider";

@Module({
  controllers: [],
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
