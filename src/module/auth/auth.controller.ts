import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard, LocalGuard, Roles } from 'src/cores/guard.service';
import { PrismaService } from 'src/cores/prisma.service';
import { encodePassword } from 'src/cores/utils.service';
import { CreateUserDto } from 'src/module/user/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return req.user;
  }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const exist = await this.prisma.user.findFirst({
      where: { username: createUserDto.username },
    });

    if (exist) {
      throw new HttpException('Username already Exist', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await encodePassword(createUserDto.password),
      },
    });

    throw new HttpException('Success', HttpStatus.OK);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  status(@Req() req: Request) {
    return req.user;
  }
}
