// src/dto/LoginDto.ts
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  minLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  fullName: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @Transform(({ value }) => value?.trim())
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Transform(({ value }) => value?.trim())
  password: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value && typeof value === 'string' ? value.trim() : value
  )
  referralCode: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value && typeof value === 'string' ? value.trim() : value
  )
  utmString: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    value && typeof value === 'string' ? value.trim() : value
  )
  campaignId: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  source: string;
}
