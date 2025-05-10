import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetRewardDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  search: string;
}
