import { CreateRewardProviderDto } from "../../../dtos/reward/create-reward-provider.dto";
import { RewardProviderRespositry } from "../../../repositiries";
import { ApiError } from "../../../utils/api-error";


export const createRewardProviderService = async (
  data: CreateRewardProviderDto
) => {
  const isAlreadyAvailable = await RewardProviderRespositry.findOne({
    where: { name: data.name },
  });

  if (isAlreadyAvailable) {
    throw new ApiError(409, 'Provider with this name already exists');
  }

  const provider = RewardProviderRespositry.create(data);
  await RewardProviderRespositry.save(provider);
  return;
};
