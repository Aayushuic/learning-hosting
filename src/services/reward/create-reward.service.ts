import { CreateRewardDto } from '../../dtos/reward/create-reward.dto';
import {
  RewardProviderRespositry,
  RewardRespositry,
} from '../../repositiries/reward.repositry';
import { ApiError } from '../../utils/api-error';

export const createRewardService = async (
  { name, provider, points }: CreateRewardDto,
  imageUrl: string
) => {
  const isExist = await RewardRespositry.exists({ where: { name } });
  if (isExist) {
    throw new ApiError(409, 'Reward with this name already exits');
  }

  const rewardProvider = await RewardProviderRespositry.findOne({
    where: { name: provider },
  });

  if (!rewardProvider) {
    throw new ApiError(404, 'Given provider not found');
  }

  const newReward = RewardRespositry.create({
    name,
    provider: rewardProvider,
    points,
    imageUrl,
  });
  
  const savedReward = await RewardRespositry.save(newReward);
  return savedReward;
};
