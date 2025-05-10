import { IsEnum } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ReferralStatus {
  NEW = 'new',
  AWAIT_CREDIT = 'await_credit',
}

@Entity('Referral')
export class Referral {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  referralUserId: string;

  @Column()
  referralPanelListId: string;

  @Column()
  referralName: string;

  @Column()
  referralEmail: string;

  @Column({ nullable: true })
  referralFriendPanelistId: string;

  @Column({ nullable: true })
  referralFriendEmail: string;

  @Column({ nullable: true })
  referralFriendName: string;

  @Column({ nullable: true })
  referralFriendAge: number;

  @Column({ nullable: true, default: 0 })
  pointsEarned: number;

  @Column({ default: false })
  referralActivated: boolean;

  @Column()
  referralCode: string;

  @Column({ type: 'enum', enum: ReferralStatus, default: ReferralStatus.NEW })
  referralStatus: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
