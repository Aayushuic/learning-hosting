import { Request, Response } from 'express';
import { getRewardProviderService } from '../../../services/reward/reward-provider/get-reward-provider.dto';

export const getRewardProviderController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const result = await getRewardProviderService();
  return res.status(200).json({
    success: true,
    message: 'Reward providers fetch successfully',
    data: result,
  });
};
