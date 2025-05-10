import { Request, Response } from 'express';
import { ForgotPasswordDto } from '../../dtos/auth/forgot-password.dto';
import { forgotPasswordService } from '../../services/auth/forgot-password.service';
import { Purpose } from '../../entities/otps.entity';

export const forgotPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;

  const link = await forgotPasswordService({
    email,
    purpose: Purpose.FORGOT_PASSWORD,
  });

  res.status(200).json({
    success: true,
    message:
      'If you are a registered user, you will receive an otp on your mail.',
    link,
  });
};
