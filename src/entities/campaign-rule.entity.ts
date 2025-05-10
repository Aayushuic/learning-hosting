import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Campaign } from './campaign.entity';

@Entity('CampaignRules')
export class CampaignRule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  campaignId: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.rules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campaignId' })
  campaign: Campaign;

  @Column({ type: 'int' })
  @Check('"minAge" >= 1')
  @Check('"minAge" <= 100')
  minAge: number;

  @Column({ type: 'int' })
  @Check('"maxAge" >= 1')
  @Check('"maxAge" <= 100')
  maxAge: number;

  @Column({ type: 'int' })
  @Check('"points" >= 1')
  points: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
