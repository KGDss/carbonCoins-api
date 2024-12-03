import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard, Roles } from 'src/cores/guard.service';
import { GetAllUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
import { PrismaService } from 'src/cores/prisma.service';

@ApiTags('users')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly service: UserService,
    private prisma: PrismaService,
  ) {}

  @Roles(UserRole.ADMIN)
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne({ id });
  }

  @Roles(UserRole.ADMIN)
  @Get()
  async getAll(@Query() query: GetAllUserDto) {
    return await this.service.findAllByQuery(query);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    const user = await this.service.findOne({ id });
    if (body.username) {
      const userExist = await this.prisma.user.findFirst({
        where: { username: body.username },
      });
      if (userExist && userExist.username !== user.username) {
        throw new HttpException(
          'Username already Exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    await this.prisma.user.update({ where: { id: user.id }, data: body });

    return new HttpException('Success', HttpStatus.OK);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.service.findOne({ id });

    await this.prisma.user.delete({ where: { id: user.id } });

    return new HttpException('Succes', HttpStatus.OK);
  }
}
