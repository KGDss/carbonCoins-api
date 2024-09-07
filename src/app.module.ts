import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './cores/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AdminController, UserController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
