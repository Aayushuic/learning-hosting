import { IsUUID } from 'class-validator';

export class ReferralUuidParamDto {
  @IsUUID()
  referralId: string;
}
