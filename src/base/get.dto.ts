import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class BaseGetOneDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class BaseGetAllDto {
  @ApiPropertyOptional()
  @Transform(({ obj, key }) => (obj[key] = Number(obj[key])))
  limit?: number;
}
