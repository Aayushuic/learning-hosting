import { Request, Response } from 'express';
import { createRewardProviderService } from '../../../services/reward/reward-provider/create-reward-provider.service';

export const createRewardProviderController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, description } = req.body;

  await createRewardProviderService({ name, description });

  return res
    .status(200)
    .json({ success: true, message: 'Reward provider create successfully' });
};
