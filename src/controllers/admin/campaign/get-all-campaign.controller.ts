import { Request, Response } from 'express';
import { ILike } from 'typeorm';
import { getAllCampaignService } from '../../../services/campaign/get-all-campaign.service';

export async function getAllCampaignController(
  req: Request,
  res: Response
): Promise<any> {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const search = (req.query.search as string)?.trim() || '';

  const result = await getAllCampaignService({
    limit,
    page,
    search,
  });

  return res.status(200).json({
    success: true,
    ...result,
  });
}
