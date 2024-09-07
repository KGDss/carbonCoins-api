import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';
import { PrismaService } from 'src/cores/prisma.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private prisma: PrismaService,
  ) {}

  @Get()
  async getAll() {
    return 'hi';
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.prisma.user.create({ data: createUserDto });
  }
}
