import { Request, Response } from 'express';
import { resendReferralEmailService } from '../../services/referral/resend-referral-email.service';

export const resendReferralEmailController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { referralId } = req.params;

  const referralFriendName = await resendReferralEmailService(referralId);

  return res.status(200).json({
    success: true,
    message: `email sent successfully to ${referralFriendName}`,
  });
};
