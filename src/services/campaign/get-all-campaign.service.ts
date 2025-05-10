import { ILike } from 'typeorm';
import { CampaignRepository } from '../../repositiries';

export async function getAllCampaignService({
  limit = 10,
  page = 1,
  search = '',
}: {
  limit?: number;
  page?: number;
  search?: string;
}) {
  const skip = (page - 1) * limit;
  const where: any = {};

  if (search) {
    where.name = ILike(`%${search}%`);
  }
  
  const [campaigns, totalItems] = await CampaignRepository.findAndCount({
    where,
    relations: ['rules'],
    take: limit,
    skip,
    order: { createdAt: 'DESC' },
  });

  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: campaigns,
    meta: {
      limit,
      page,
      totalItems,
      totalPages,
    },
  };
}
