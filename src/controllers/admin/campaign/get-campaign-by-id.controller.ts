import { Request, Response } from 'express';
import { getCampaignByIdService } from '../../../services/campaign/get-campaign-by-id.service';

export const getCampaignByIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const campaign = await getCampaignByIdService(id);
  if (!campaign) {
    return res
      .status(404)
      .json({ success: false, message: 'Campaign not found' });
  }
  return res.status(200).json({ success: true, data: campaign });
};
