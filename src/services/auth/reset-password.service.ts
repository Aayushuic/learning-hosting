import { ResetPasswordDto } from '../../dtos/auth/reset-password.dto';
import { UserRespository } from '../../repositiries/user.repositry';
import { ApiError } from '../../utils/api-error';
import bcrypt from 'bcryptjs';
import { otpVerification } from '../../utils/verify-otp';
import { SITE_URL } from '../../constants/common.constants';
import { getSuccessfulPasswordChangedContent } from '../../templates/reset-password-successful.template';
import { sendEmail } from '../email/email.service';

export const resetPasswordService = async ({
  password,
  code,
  email,
  purpose,
}: ResetPasswordDto) => {
  await otpVerification({ purpose, code, email });

  const userRecord = await UserRespository.findByEmail(email);

  if (!userRecord) {
    throw new ApiError(400, 'Bad Request');
  }

  const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10', 10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  userRecord.password = hashedPassword;
  userRecord.loginAttempts = 0;
  userRecord.isActive = true;
  await UserRespository.save(userRecord);

  const content = getSuccessfulPasswordChangedContent(
    userRecord.name,
    SITE_URL
  );

  await sendEmail(
    userRecord.email,
    'HappyDot.sg Password Changed Successfully',
    content
  );

  return;
};
