import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';
import { BaseGetAllDto, BaseGetOneDto } from 'src/base/get.dto';

export class GetOneUserDto extends BaseGetOneDto {}

export class GetAllUserDto extends BaseGetAllDto {}

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  username: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  wallet_address: string;

  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;
}
