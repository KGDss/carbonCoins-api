import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseGetAllDto, BaseGetOneDto } from 'src/base/get.dto';

export class GetOneUserDto extends BaseGetOneDto {}

export class GetAllUserDto extends BaseGetAllDto {}

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  wallet_address?: string;

  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;
}
