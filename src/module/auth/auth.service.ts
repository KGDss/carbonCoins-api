import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/cores/prisma.service';
import { comparePasswrod } from 'src/cores/utils.service';
import { AuthLoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async fineOneUser(where: Prisma.UserWhereInput) {
    const user = await this.prisma.user.findFirst({ where });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async validateUser({ username, password }: AuthLoginDto) {
    const user = await this.prisma.user.findFirst({ where: { username } });
    if (!user) return null;

    const isMatch = await comparePasswrod(password, user.password);
    if (!isMatch) return null;

    const token = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return { user, token };
  }
}
