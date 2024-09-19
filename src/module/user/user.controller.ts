import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllUserDto } from './user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard, Roles } from 'src/cores/guard.service';
import { UserRole } from '@prisma/client';

@ApiTags('users')
@Controller('user')
@UseGuards(JwtAuthGuard)
@Roles(UserRole.ADMIN)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne({ id });
  }

  @Get()
  async getAll(@Query() query: GetAllUserDto) {
    return await this.service.findAllByQuery(query);
  }
}
