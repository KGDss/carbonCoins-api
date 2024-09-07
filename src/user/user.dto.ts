import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

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

  // @ApiProperty()
  // total_coins: number;

  // @ApiProperty()
  // used_coins: number;
}
