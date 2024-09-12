import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/cores/prisma.service';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private prisma: PrismaService,
  ) {}

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne({ id });
  }
}
