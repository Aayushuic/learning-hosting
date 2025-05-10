import { Request, Response } from 'express';
import { getAllReferralService } from '../../services/referral/get-all-referral.service';

export const getAllReferralController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const search = (req.query.search as string)?.trim() || '';

  const data = await getAllReferralService({ limit, page, search });

  return res.status(200).json({
    success: true,
    message: 'Referral fetched successfully',
    data,
  });
};
