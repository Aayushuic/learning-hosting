import { Request, Response } from 'express';
import { deleteRewardProviderService } from '../../../services/reward/reward-provider/delete-reward-provider.service';

export const deleteRewardProviderController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { rewardProviderId } = req.params;
  await deleteRewardProviderService(rewardProviderId);
  return res
    .status(200)
    .json({ success: true, message: 'Reward provider deleted successfully' });
};
