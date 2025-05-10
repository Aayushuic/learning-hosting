import { Request, Response } from 'express';
import { updateCampaignService } from '../../../services/campaign/update-campaign.service';

export const updateCampaignController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { name, startDate, endDate, isActive, rules } = req.body;
  const updatedCampaign = { name, startDate, endDate, isActive, rules };

  const responseCampaign = await updateCampaignService({
    id,
    updatedCampaign,
  });

  return res.status(200).json({
    success: true,
    message: 'Campaign updated successfully',
    data: responseCampaign,
  });
};
