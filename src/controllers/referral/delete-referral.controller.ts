import { Request, Response } from 'express';
import { deleteReferralService } from '../../services/referral/delete-referral.service';

export const deleteReferralController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { referralId } = req.params;

  await deleteReferralService(referralId);

  return res.status(200).json({
    success: true,
    message: 'Referral deleted successfully',
  });
};
