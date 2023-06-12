import { Module } from '@nestjs/common';
import {PrismaService} from "./database.provider";

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
