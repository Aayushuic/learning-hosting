import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { RewardProvider } from './reward-provider.entity';

@Entity('Rewards')
export class Rewards {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'int', default: 0 })
  points: number;

  @Column({ type: 'varchar', length: 255 })
  imageUrl: string;

  @ManyToOne(() => RewardProvider, { eager: true, onDelete: 'CASCADE' })
  provider: RewardProvider;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
