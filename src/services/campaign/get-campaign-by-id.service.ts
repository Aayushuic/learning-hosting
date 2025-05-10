import { CampaignRepository } from '../../repositiries';

export const getCampaignByIdService = async (id: string) => {
  const campaign = await CampaignRepository.findOne({
    where: { id },
    relations: ['rules'],
  });
  return campaign;
};
