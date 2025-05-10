import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Purpose } from '../../entities/otps.entity';

export class OTPVerifyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  purpose: Purpose;
}
