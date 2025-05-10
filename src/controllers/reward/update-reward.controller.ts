import { Request, Response } from 'express';
import { updateRewardService } from '../../services/reward/update-reward.service';
import { UpdateRewardDto } from '../../dtos/reward/update-reward.dto';

export const updateRewardController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, provider, points } = req.query as unknown as UpdateRewardDto;
  const { id } = req.params;

  if (!req.file && !name && !provider && !points) {
    return res.status(400).json({
      success: false,
      message:
        'At least one field (name, provider, points, or image) must be provided to update the reward.',
    });
  }

  let data;
  if (!req.file) {
    data = await updateRewardService({ name, provider, points }, id);
  } else {
    const imagePath = req.file.filename;
    const imageUrl = `${process.env.SERVER_URL}/uploads/rewards/${imagePath}`;

    data = await updateRewardService({ name, provider, points }, id, imageUrl);
  }
  return res
    .status(200)
    .json({ success: true, message: 'Reward Updated Successfully', data });
};
