import { RewardProviderRespositry } from '../../../repositiries';

export const getRewardProviderService = async () => {
  return await RewardProviderRespositry.find();
};
