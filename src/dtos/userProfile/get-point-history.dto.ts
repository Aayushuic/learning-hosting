import { Type } from 'class-transformer';
import {
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { transformDate } from '../../utils/transform-date';

export class GetPointHistoryDto {
  @Transform(({ value }) => (value ? transformDate(value) : value))
  @IsISO8601()
  @IsNotEmpty()
  from: string;

  @Transform(({ value }) => (value ? transformDate(value) : value))
  @IsISO8601()
  @IsNotEmpty()
  to: string;
}

export class GetPointHistoryQueryDto {
  @IsUUID()
  @IsOptional()
  userId: string;

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
