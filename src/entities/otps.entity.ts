import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

export enum Purpose {
  LOGIN_VERIFICATION = 'login-verification',
  FORGOT_PASSWORD = 'forgot-password',
}

@Entity('otps')
export class Otp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Purpose,
  })
  purpose: Purpose;

  @Column()
  code: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  isUsed: boolean;
}
