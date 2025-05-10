import { CampaignRepository } from '../../repositiries';

export const deleteCampaignService = async (id: string) => {
  return CampaignRepository.delete(id);
};
