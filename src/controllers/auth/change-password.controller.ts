import { Request, Response } from 'express';
import { changePasswordService } from '../../services/auth/change-password.service';

export const changePasswordController = async (req: Request, res: Response) => {
  const { newPassword } = req.body;

  const userInfo = (req as any).user;

  await changePasswordService(
    {
      newPassword,
    },
    userInfo.email
  );

  res
    .status(200)
    .json({ success: true, message: 'password reset successfully' });
};
