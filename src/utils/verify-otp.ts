import { OTPVerifyDto } from '../dtos/auth/otp-verify.dto';
import { OTPRepository } from '../repositiries/otp.repositry';
import { ApiError } from './api-error';

export const otpVerification = async ({
  purpose,
  email,
  code,
}: OTPVerifyDto) => {
  const otpRecord = await OTPRepository.findOne({
    where: { email, purpose },
  });

  if (!otpRecord) {
    throw new ApiError(404, 'OTP not found or invalid.');
  }

  if (otpRecord.code !== code) {
    throw new ApiError(400, 'Incorrect OTP code.');
  }

  if (otpRecord.isUsed) {
    throw new ApiError(400, 'OTP has already been used.');
  }

  const currentTime = new Date();
  if (otpRecord.expiresAt <= currentTime) {
    throw new ApiError(400, 'OTP has expired');
  }

  await OTPRepository.delete({ id: otpRecord.id });

  await OTPRepository.createQueryBuilder()
    .delete()
    .from('otps')
    .where('expiresAt <= :currentTime', { currentTime: new Date() })
    .execute();

  return true;
};
