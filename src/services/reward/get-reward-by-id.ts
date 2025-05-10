import { RewardRespositry } from '../../repositiries';

export const getRewardByIdService = async (id: string) => {
  return await RewardRespositry.findOne({ where: { id } });
};
