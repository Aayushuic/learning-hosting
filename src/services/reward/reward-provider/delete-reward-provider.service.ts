import { RewardProviderRespositry } from '../../../repositiries';
import { ApiError } from '../../../utils/api-error';

export const deleteRewardProviderService = async (id: string) => {
  const result = await RewardProviderRespositry.delete(id);
  if (result.affected === 0) {
    throw new ApiError(404, 'Reward provider not found');
  }
  return;
};
