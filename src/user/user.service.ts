import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/cores/prisma.service';

// const query = () => {};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const exist = await this.prisma.user.findUnique({
      where: where,
    });

    if (!exist) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

    return exist;
  }
}
