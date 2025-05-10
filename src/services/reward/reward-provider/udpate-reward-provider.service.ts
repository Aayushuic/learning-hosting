import { UpdateRewardProviderDto } from '../../../dtos/reward/update-reward-provider.dto';
import { RewardProviderRespositry } from '../../../repositiries';
import { ApiError } from '../../../utils/api-error';

export const updateRewardProviderService = async (
  id: string,
  data: UpdateRewardProviderDto
) => {
  const provider = await RewardProviderRespositry.findOne({ where: { id } });
  console.log(data);

  if (!provider) {
    throw new ApiError(404, 'Provider not found');
  }

  if (data.name && data.name !== provider.name) {
    const existingProvider = await RewardProviderRespositry.findOne({
      where: { name: data.name },
    });

    if (existingProvider) {
      throw new ApiError(400, 'A provider with this name already exists');
    }

    provider.name = data.name;
  }

  provider.description = data.description;
  await RewardProviderRespositry.save(provider);

  return provider;
};
