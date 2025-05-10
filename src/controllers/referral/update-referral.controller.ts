import { Request, Response } from 'express';
import { updateReferralService } from '../../services/referral/update-referral.service';

export const updateReferralController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { referralId } = req.params;
  const referralData = req.body;

  const updatedReferral = await updateReferralService(referralId, referralData);

  return res.status(200).json({
    success: true,
    message: 'Referral updated successfully',
    data: updatedReferral,
  });
};
