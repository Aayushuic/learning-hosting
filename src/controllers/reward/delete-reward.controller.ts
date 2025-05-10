import { Request, Response } from 'express';
import { deleteRewardService } from '../../services/reward/delete-reward.service';

export const deleteRewardController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  const result = await deleteRewardService(id);

  if (result.affected === 0) {
    return res
      .status(404)
      .json({ message: 'Reward not found', success: false });
  }

  return res
    .status(200)
    .json({ message: 'Reward deleted successfully', success: true });
};
