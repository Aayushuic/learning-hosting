import { AppDataSource } from '../../database/data-source';
import { UpdateRewardDto } from '../../dtos/reward/update-reward.dto';
import { Rewards } from '../../entities/reward.entity';
import { RewardProviderRespositry, RewardRespositry } from '../../repositiries';
import { ApiError } from '../../utils/api-error';

export const updateRewardService = async (
  { name, provider, points }: UpdateRewardDto,
  id: string,
  imageUrl?: string
) => {
  const reward = await RewardRespositry.findOne({
    where: { id },
  });

  if (!reward) {
    throw new ApiError(404, 'Reward not found');
  }

  if (name !== undefined) reward.name = name;
  if (provider !== undefined) {
    const rewardProvider = await RewardProviderRespositry.findOne({
      where: { name: provider },
    });

    if (!rewardProvider) {
      throw new ApiError(404, 'Given provider not found');
    } else {
      reward.provider = rewardProvider;
    }
  }
  if (points !== undefined) reward.points = points;
  if (imageUrl !== undefined) reward.imageUrl = imageUrl;

  await RewardRespositry.save(reward);
  return reward;
};
