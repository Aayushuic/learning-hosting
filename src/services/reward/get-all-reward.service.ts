import { ILike } from 'typeorm';
import { GetRewardDto } from '../../dtos/reward/get-reward.dto';
import { RewardRespositry } from '../../repositiries';

export const getAllRewardService = async ({
  limit,
  page,
  search,
}: GetRewardDto) => {
  const skip = (page - 1) * limit;

  let where: any = {};

  if (search) {
    where.name = ILike(`%${search}%`);
  }

  const [rewards, totalItems] = await RewardRespositry.findAndCount({
    where,
    take: limit,
    skip,
    order: { createdAt: 'DESC' },
  });

  const totalPages = Math.ceil(totalItems / limit);
  return {
    data: {
      rewards,
      metaData: {
        limit,
        page,
        totalItems,
        totalPages,
      },
    },
  };
};
