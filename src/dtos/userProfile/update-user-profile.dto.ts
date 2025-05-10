import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsPhoneNumber,
  IsBoolean,
  ValidateIf,
} from 'class-validator';
import {
  Citizenship,
  Gender,
  MaritalStatus,
  Race,
} from '../../entities/user-meta-data.entity';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsEnum(Race)
  race: Race;

  @IsOptional()
  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @IsOptional()
  @IsDateString()
  dateOfBirth: string;

  @IsOptional()
  @IsPhoneNumber('SG', { message: 'Invalid Singapore mobile number' })
  mobileNumber: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsEnum(Citizenship)
  citizenship: Citizenship;

  @IsOptional()
  @IsBoolean()
  smsNotification: boolean;

  @IsOptional()
  @IsBoolean()
  newsAndUpdatesViaEmail: boolean;

  @ValidateIf((o) => o.race === Race.OTHERS)
  @IsString({ message: 'Race details must be provided when race is "others"' })
  raceDetails: string;
}
