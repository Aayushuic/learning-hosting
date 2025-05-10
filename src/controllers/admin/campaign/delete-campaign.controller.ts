import { Request, Response } from 'express';
import { deleteCampaignService } from '../../../services/campaign/delete-campaign.service';

export const deleteCampaignController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  const result = await deleteCampaignService(id);

  if (result.affected === 0) {
    return res
      .status(404)
      .json({ message: 'Campaign not found', success: false });
  }

  return res
    .status(200)
    .json({ message: 'Campaign deleted successfully', success: true });
};
