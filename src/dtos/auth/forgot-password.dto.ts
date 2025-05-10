import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Purpose } from '../../entities/otps.entity';

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty()
  email: string;

  @IsOptional()
  purpose: Purpose;
}
