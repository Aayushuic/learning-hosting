import { ForgotPasswordDto } from '../../dtos/auth/forgot-password.dto';
import { UserRespository } from '../../repositiries/user.repositry';
import { generateOTPService } from '../otp/otp.service';
import { OTPRepository } from '../../repositiries/otp.repositry';
import { sendEmail } from '../email/email.service';
import { getOTPEmailContent } from '../../templates/otp-email-content.template';
import { SITE_URL } from '../../constants/common.constants';

const OTP_CONFIG = {
  expiresInMinutes: parseInt(process.env.OTP_EXPIRES || '30', 10),
  digits: parseInt(process.env.OTP_DIGIT || '6', 10),
};
const MAX_PASSWORD_RESET_REQUEST = parseInt(
  process.env.MAX_PASSWORD_RESET_REQUEST || '4'
);

export const forgotPasswordService = async ({
  email,
  purpose,
}: ForgotPasswordDto) => {
  const isUser = await UserRespository.findOne({
    where: { email },
  });

  if (!isUser) {
    return;
  }

  const { code, expiresAt } = generateOTPService(OTP_CONFIG);
  let otp = await OTPRepository.findOne({
    where: { email: email, purpose },
  });

  if (otp) {
    (otp.code = code), (otp.expiresAt = expiresAt);
  } else {
    otp = OTPRepository.create({
      code,
      email: email,
      purpose,
      expiresAt,
    });
  }

  await OTPRepository.save(otp);
  const content = getOTPEmailContent({
    title: 'HappyDot.sg Reset Password One-time PIN',
    otpCode: code,
    siteUrl: SITE_URL,
  });

  await sendEmail(email, 'HappyDot.sg Reset Password One-time PIN', content);
};
