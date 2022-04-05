import { PrismaService } from './database/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
