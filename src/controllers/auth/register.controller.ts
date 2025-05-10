import { Request, Response } from 'express';
import { WpRegisterService } from '../../services/auth/register.service';

export const wpRegisterController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const {
    fullName,
    email,
    password,
    referralCode,
    utmString = '',
    campaignId = '',
    source,
  } = req.body;

  // const referralCode = req.query;

  await WpRegisterService({
    fullName,
    email,
    password,
    referralCode,
    utmString,
    campaignId,
    source,
  });

  return res
    .status(200)
    .json({ success: true, message: 'register successfully' });
};
