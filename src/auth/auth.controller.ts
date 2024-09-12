import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthLoginDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/user.dto';
import { PrismaService } from 'src/cores/prisma.service';
import { comparePasswrod, encodePassword } from 'src/cores/utils.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  @Post('login')
  async login(@Body() { username, password }: AuthLoginDto) {
    const user = await this.authService.fineOneUser({ username });

    const isMatch = await comparePasswrod(password, user.password);

    if (!isMatch) {
      throw new HttpException('Incorrect Password', HttpStatus.BAD_REQUEST);
    }

    throw new HttpException('Login successfully', HttpStatus.OK);
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
}
