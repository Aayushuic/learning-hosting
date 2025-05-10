import { Request, Response } from 'express';
import { changeNotificationSettingService } from '../../services/notification';

export const changeNotificationSettingController = async (
  req: Request,
  res: Response
) => {
  const { email } = (req as any).user;
  const data = req.body;

  await changeNotificationSettingService(data, email);

  return res.status(200).json({
    success: true,
    message: 'notification settings update successfully',
  });
};
