import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
  isNotEmpty,
  IsNotEmpty,
} from 'class-validator';

export class GetCampaignDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  search: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;
}
