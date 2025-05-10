import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateRewardDto {
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'Name is too long' })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  provider: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  points: number;
}
