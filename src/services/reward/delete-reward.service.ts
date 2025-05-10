import { RewardRespositry } from '../../repositiries';

export const deleteRewardService = async (id: string) => {
  return await RewardRespositry.delete(id);
};
