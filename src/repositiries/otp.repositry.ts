import { AppDataSource } from '../database/data-source';
import { Otp } from '../entities/otps.entity';

export const OTPRepository = AppDataSource.getRepository(Otp);
