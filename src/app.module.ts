import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './cores/prisma.service';
import { AuthModule } from './module/auth/auth.module';
import { UserController } from './module/user/user.controller';
import { UserService } from './module/user/user.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
