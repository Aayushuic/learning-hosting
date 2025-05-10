import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHERS = 'others',
}

export enum Race {
  CHINESE = 'chinese',
  MALAY = 'malay',
  INDIAN = 'indian',
  EURASIAN = 'eurasian',
  OTHERS = 'others',
}

export enum MaritalStatus {
  SINGLE = 'single',
  SOONTOBEMARRIED = 'soontobemarried',
  MARRIED = 'married',
  DIVORCED = 'divorced',
  SEPARATED = 'separated',
  WIDOWED = 'widowed',
}

export enum Citizenship {
  PERMANENT_RESIDENT = 'permanentResident',
  SINGAPORE_CITIZEN = 'singaporecitizen',
}

@Entity('UserMetaData')
export class UserMetaData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  utmString: string;

  @Column({ unique: true })
  referralCode: string;

  @Column({ default: true })
  smsNotification: boolean;

  @Column({ default: true })
  newsUpdateNotification: boolean;

  @Column({ nullable: true })
  campaignId: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: Race,
    nullable: true,
  })
  race: Race;

  @Column({
    type: 'enum',
    enum: MaritalStatus,
    nullable: true,
  })
  maritalStatus: MaritalStatus;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: string;

  @Column({ type: 'varchar', nullable: true })
  mobileNumber: string;

  @Column({
    type: 'enum',
    enum: Citizenship,
    nullable: true,
  })
  citizenship: Citizenship;

  @Column({ type: 'varchar', nullable: true })
  refferredBy: string;

  @Column({ type: 'varchar', length: '255', nullable: true })
  raceDetails: string;

  @Column({ default: false })
  isProfileCompleted: boolean;

  @Column({ nullable: true, type: 'varchar' })
  avatarId: string;

  @OneToOne(() => User, (user) => user.metaData, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
