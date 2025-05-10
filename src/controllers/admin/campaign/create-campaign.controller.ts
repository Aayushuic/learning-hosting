import { Request, Response } from 'express';
import { createCampaignService } from '../../../services/campaign/create-campaign.service';

export async function createCampaignController(
  req: Request,
  res: Response
): Promise<void> {
  const campaign = await createCampaignService(req.body);

  res.status(201).json({
    success: true,
    message: 'Campaign created successfully',
    data: campaign,
  });
  return;
}
