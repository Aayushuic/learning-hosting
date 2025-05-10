import { IsString } from 'class-validator';

export class UpdateUserAvatarDto {
  @IsString()
  avatarId: string;
}
