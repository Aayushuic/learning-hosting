import {
  IsArray,
  ArrayMaxSize,
  ValidateNested,
  IsString,
  IsEmail,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class FriendDto {
  @IsString()
  friendName: string;

  @IsEmail()
  friendEmail: string;
}

export class CreateReferralDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'You must have one friend details to refer' })
  @ArrayMaxSize(5, { message: 'You can refer up to 5 friends at a time.' })
  @ValidateNested({ each: true })
  @Type(() => FriendDto)
  friends: FriendDto[];
}
