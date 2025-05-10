import { Request, Response } from 'express';
import { resetPasswordService } from '../../services/auth/reset-password.service';
import { Purpose } from '../../entities/otps.entity';

export const resetPasswordController = async (req: Request, res: Response) => {
  const { password, code, email } = req.body;
  const purpose = Purpose.FORGOT_PASSWORD;

  await resetPasswordService({
    password,
    code,
    email,
    purpose,
  });

  res
    .status(200)
    .json({ success: true, message: 'password reset successfully' });
};
