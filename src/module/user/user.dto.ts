import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseGetAllDto } from 'src/base/get.dto';

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

export class UpdateUserDto extends PartialType(
  PickType(CreateUserDto, ['username', 'email']),
) {}
