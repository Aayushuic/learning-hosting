import { ILike } from 'typeorm';
import { AppDataSource } from '../database/data-source';
import { Campaign } from '../entities/campaign.entity';
import { CampaignRule } from '../entities/campaign-rule.entity';

export const CampaignRepository = AppDataSource.getRepository(Campaign);

export const CampaignRuleRepository = AppDataSource.getRepository(CampaignRule);
