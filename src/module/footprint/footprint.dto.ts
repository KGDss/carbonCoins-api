import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseGetAllDto } from 'src/base/get.dto';

export class GetAllCarbonFootprintReportDto extends BaseGetAllDto {}

export class CreateCarbonFootprintReportDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  report_name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  scope_id: string; // FK to Scope

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  topic_id: string; // FK to Topic

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  item_id: string; // FK to Item

  @ApiProperty({ required: true })
  @IsNumber()
  amount: number; // Amount

  @ApiProperty()
  @IsNumber()
  total_emissions: number; // Emission calculated
}

export class UpdateCarbonFootprintReportDto extends PartialType(
  PickType(CreateCarbonFootprintReportDto, [
    'report_name',
    'date',
    'scope_id',
    'topic_id',
    'item_id',
  ] as const),
) {}
