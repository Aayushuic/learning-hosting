import { Request, Response } from 'express';
import { getRewardByIdService } from '../../services/reward/get-reward-by-id';

export const getRewardByIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  const data = await getRewardByIdService(id);

  if (!data) {
    return res
      .status(404)
      .json({ success: false, message: 'Reward not found' });
  }

  return res.status(200).json({ success: true, data });
};
