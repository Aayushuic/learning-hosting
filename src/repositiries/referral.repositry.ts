import { AppDataSource } from '../database/data-source';
import { Referral } from '../entities/referral.entity';

export const ReferralRepositry = AppDataSource.getRepository(Referral);
