import { Request, Response } from 'express';
import { updateRewardProviderService } from '../../../services/reward/reward-provider/udpate-reward-provider.service';

export const updateRewardProviderController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { rewardProviderId } = req.params;
  const { name, description } = req.body;

  await updateRewardProviderService(rewardProviderId, { name, description });
  return res.status(200).json({
    success: true,
    message: 'Reward provider updated successfully',
  });
};
