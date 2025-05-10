import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { UserMetaData } from './user-meta-data.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  forstaMemberStatus: string;

  @Column({ nullable: true })
  forstaLifestyleStatus: string;

  @Column()
  forstaPanelistId: string;

  @Column({ default: false })
  isVerified: boolean;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Permission, (permission) => permission.users)
  @JoinTable()
  permissions: Permission[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  loginAttempts: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserMetaData, (metaData) => metaData.user, {
    cascade: true,
  })
  metaData: UserMetaData;
}
