import { Request, Response } from 'express';
import { createRewardService } from '../../services/reward/create-reward.service';
import { CreateRewardDto } from '../../dtos/reward/create-reward.dto';

export const createRewardController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, provider, points } = req.query as unknown as CreateRewardDto;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Image is required',
    });
  } else {
    const imagePath = req.file.filename;

    const imageUrl = `${process.env.SERVER_URL}/uploads/rewards/${imagePath}`;
    const data = await createRewardService(
      {
        name,
        provider,
        points,
      },
      imageUrl
    );
    return res.status(201).json({
      success: true,
      message: 'reward created successfully',
      data,
    });
  }
};
