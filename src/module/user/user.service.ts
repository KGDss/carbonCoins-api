import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/cores/prisma.service';
import {
  getPageInformation,
  getPagination,
  getSort,
} from 'src/cores/utils.service';
import { GetAllUserDto, UpdateUserDto } from './user.dto';

const query = (query: GetAllUserDto) => {
  const where: Prisma.UserWhereInput = {};

  if (query.query) {
    where.OR = [
      { username: { contains: query.query, mode: 'insensitive' } },
      { email: { contains: query.query, mode: 'insensitive' } },
    ];
  }

  return where;
};
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: where,
    });

    if (!user) {
      throw new HttpException(
        `User id:${where.id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findAllByQuery(q: GetAllUserDto) {
    const { limit, skip } = getPageInformation(q.limit, q.page);
    const order = getSort(q.sort, q.reverse);
    const where = query(q);

    const countStmt = this.prisma.user.count({ where });
    const queryStmt = this.prisma.user.findMany({
      where,
      orderBy: order,
      take: limit,
      skip,
    });
    const [count, entities] = await Promise.all([countStmt, queryStmt]);

    const response = {
      pagination: getPagination(limit, q.page, count),
      entities,
    };

    return response;
  }
}
