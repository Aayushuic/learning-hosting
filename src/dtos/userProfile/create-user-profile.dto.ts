import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsPhoneNumber,
} from 'class-validator';
import {
  Citizenship,
  Gender,
  MaritalStatus,
  Race,
} from '../../entities/user-meta-data.entity';

export class CreateUserProfileDto {
  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(Race)
  race: Race;

  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @IsDateString()
  dateOfBirth: string;

  @IsPhoneNumber('SG', { message: 'Invalid mobile number' })
  mobileNumber: string;

  @IsEnum(Citizenship)
  citizenship: Citizenship;
}
