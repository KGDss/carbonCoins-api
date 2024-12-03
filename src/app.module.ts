import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './cores/prisma.service';
import { AuthModule } from './module/auth/auth.module';
import { UserController } from './module/user/user.controller';
import { UserService } from './module/user/user.service';
import {} from './module/footprint/footprint.controller';
import { CarbonFootprintService } from './module/footprint/footprint.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
