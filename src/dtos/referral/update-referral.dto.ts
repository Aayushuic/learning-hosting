import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateReferralDto {
  @IsNumber({}, { message: 'Referral points earned must be a number' })
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  pointsEarned: number;
}
