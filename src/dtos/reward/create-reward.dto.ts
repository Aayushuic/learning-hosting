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

export class CreateRewardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Name is too long' })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  provider: string;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  points: number;
}
