import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Purpose } from '../../entities/otps.entity';

export class ResendOtp {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  purpose: Purpose;
}
