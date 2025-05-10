import { Request, Response } from 'express';
import { GetRewardDto } from '../../dtos/reward/get-reward.dto';
import { getAllRewardService } from '../../services/reward/get-all-reward.service';

export const getAllRewardController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const {
    limit = 10,
    search,
    page = 1,
  }: GetRewardDto = req.query as unknown as GetRewardDto;

  const data = await getAllRewardService({ limit, page, search });

  res.status(200).json({ success: true, ...data });
};
