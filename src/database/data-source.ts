import { DataSource } from 'typeorm';
import path from 'path';
import { User } from '../entities/user.entity';
import { Campaign } from '../entities/campaign.entity';
import { CampaignRule } from '../entities/campaign-rule.entity';
import { Referral } from '../entities/referral.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { Otp } from '../entities/otps.entity';
import { RewardProvider } from '../entities/reward-provider.entity';
import { Rewards } from '../entities/reward.entity';
import { UserMetaData } from '../entities/user-meta-data.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  // host: process.env.DB_HOST || 'localhost',
  url: 'postgresql://happydot_user:xf8B0T2vAGPDYRU7CpbqOQF2LgfD5Gry@dpg-d0g8cgi4d50c73fit4i0-a.oregon-postgres.render.com/happydot',
  // port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  // username: process.env.DB_USERNAME || 'postgres',
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME || 'happyDot',
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false, // This is required for Render PostgreSQL
  },
  entities: [User,Campaign,CampaignRule,Referral,Role,Permission,Otp,RewardProvider,Rewards,UserMetaData],
  migrations: [__dirname, '/migrations/**/*.{ts,js}'],
  subscribers: [],
});
