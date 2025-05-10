import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRewardProviderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}
