import { Request, Response } from 'express';
import { resendOtpService } from '../../services/otp/resend-otp.service';


export const resendOtpController = async (req: Request, res: Response) => {
  const { email, purpose } = req.body;

  await resendOtpService({ email, purpose });

  res.status(200).json({
    success: true,
    message:
      'If you are a registered user, you will receive an otp on your mail',
  });
};
