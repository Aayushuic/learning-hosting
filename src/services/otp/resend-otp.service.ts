import { SITE_URL } from '../../constants/common.constants';
import { ResendOtp } from '../../dtos/auth/resend-otp.dto';
import { Purpose } from '../../entities/otps.entity';
import { UserRespository } from '../../repositiries';
import { OTPRepository } from '../../repositiries/otp.repositry';
import { getOTPEmailContent } from '../../templates/otp-email-content.template';
import { sendEmail } from '../email/email.service';
import { generateOTPService } from '../otp/otp.service';

const OTP_CONFIG = {
  expiresInMinutes: parseInt(process.env.OTP_EXPIRES || '30', 10),
  digits: parseInt(process.env.OTP_DIGIT || '6', 10),
};

export const resendOtpService = async ({ email, purpose }: ResendOtp) => {
  const isUser = await UserRespository.findOne({ where: { email } });

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

  const title = `HappyDot.sg ${purpose} One-time PIN`;

  const content = getOTPEmailContent({
    otpCode: code,
    siteUrl: SITE_URL,
    title,
  });

  await sendEmail(email, title, content);
};
