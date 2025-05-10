import { Request, Response } from 'express';
import { CreateReferralDto } from '../../dtos/referral/create-referral.dto';
import { createreferralService } from '../../services/referral/create-referral.service';
import { getAllReferralService } from '../../services/referral/get-all-referral.service';
import { resendReferralEmailService } from '../../services/referral/resend-referral-email.service';
import { updateReferralService } from '../../services/referral/update-referral.service';

export const createReferralController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { friends } = req.body;
  const { id } = (req as any).user;

  await createreferralService(friends, id);

  return res
    .status(200)
    .json({ success: true, message: 'Given user referred successfully' });
};
