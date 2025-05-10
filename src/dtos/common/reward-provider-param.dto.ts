import { IsUUID } from 'class-validator';

export class UuidRewardProviderParamDto {
  @IsUUID()
  rewardProviderId: string;
}
