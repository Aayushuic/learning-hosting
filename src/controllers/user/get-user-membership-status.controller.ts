import { Request, Response } from 'express';
import { getUserMembershipStatusService } from '../../services/user/get-user-membershipstatus.service';

export const getUserMembershipStatusController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req.params;

  const membershipstatus = await getUserMembershipStatusService(userId);

  return res.status(200).json({
    success: true,
    message: 'User membershipStatus fetch successfully',
    membershipstatus,
  });
};
