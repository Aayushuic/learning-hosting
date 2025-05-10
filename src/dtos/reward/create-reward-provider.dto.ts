import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRewardProviderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
