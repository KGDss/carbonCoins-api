import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class BaseGetOneDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class PaginationRequest {
  limit?: number;
  page?: number;
  sort?: string;
  reverse?: boolean;
  pagination?: boolean;
}

export class BaseGetAllDto {
  @ApiPropertyOptional()
  @Transform(({ obj, key }) => (obj[key] = Number(obj[key])))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @Transform(({ obj, key }) => (obj[key] = Number(obj[key])))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sort?: string;

  @ApiPropertyOptional()
  @Transform(({ obj, key }) => (obj[key] = obj[key] === 'true'))
  @IsBoolean()
  @IsOptional()
  reverse?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  query?: string;
}
