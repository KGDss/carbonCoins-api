import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/cores/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async fineOneUser(where: Prisma.UserWhereInput) {
    const user = await this.prisma.user.findFirst({ where });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
