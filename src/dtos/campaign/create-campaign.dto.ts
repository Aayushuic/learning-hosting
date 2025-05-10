import {
  IsString,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsDate,
  IsNumber,
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  min,
  Min,
  Max,
  MaxLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsGreaterThan } from '../../decoraters/is-greater-than.decorater';

export class CampaignRuleCreateDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsInt({ message: 'minAge must be an integer' })
  @Min(1)
  @Max(100)
  @Type(() => Number)
  minAge: number;

  @IsInt({ message: 'maxAge must be an integer' })
  @Type(() => Number)
  @Min(1)
  @Max(100)
  @IsGreaterThan('minAge', { message: 'maxAge must be greater than minAge' })
  maxAge: number;

  @IsNumber({}, { message: 'points must be a number' })
  @Type(() => Number)
  @Min(1)
  points: number;
}

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, {
    message: 'Name is too long',
  })
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsBoolean()
  isActive: boolean;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsArray()
  @ArrayNotEmpty({ message: 'rules should not be empty' })
  @ValidateNested({ each: true })
  @Type(() => CampaignRuleCreateDto)
  rules: CampaignRuleCreateDto[];
}
