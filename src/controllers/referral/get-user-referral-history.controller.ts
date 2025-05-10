import { Request, Response } from 'express';
import { getUserReferralHistoryService } from '../../services/referral/get-user-referral-history.service';

export const getUserReferralHistoryController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { isAdmin, id } = (req as any).user;
  const { from, to } = req.body;
  let userId;
  const page = req.query.page as unknown as number;
  const limit = req.query.limit as unknown as number;

  if (isAdmin) {
    userId = req.query.userId;
  } else {
    userId = id;
  }

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'User ID is required for admin actions.',
    });
  }

  const result = await getUserReferralHistoryService(
    userId,
    from,
    to,
    page,
    limit
  );

  return res.status(200).json({
    success: true,
    message: 'Referral Fetched Successfully',
    result,
  });
};
