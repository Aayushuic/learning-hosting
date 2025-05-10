import { Repository } from 'typeorm';
import { Rewards } from '../entities/reward.entity';
import { AppDataSource } from '../database/data-source';
import { RewardProvider } from '../entities/reward-provider.entity';

export const RewardRespositry: Repository<Rewards> =
  AppDataSource.getRepository(Rewards);

export const RewardProviderRespositry: Repository<RewardProvider> =
  AppDataSource.getRepository(RewardProvider);
