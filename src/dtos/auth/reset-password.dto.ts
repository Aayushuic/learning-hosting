import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Purpose } from '../../entities/otps.entity';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(12, { message: 'Password must be at least 12 characters long' })
  @MaxLength(15, {
    message: 'Password should not be at greater than 15 characters',
  })
  @Matches(/^(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/^(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/^(?=.*\d)/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/^(?=.*[!@#$%^&*()])/, {
    message: 'Password must contain at least one special character: !@#$%^&*()',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEmail()
  email: string;

  @IsOptional()
  purpose: Purpose;
}
