import { ReferralRepositry } from '../../repositiries/referral.repositry';

export const getAllReferralService = async ({
  limit,
  page,
  search,
}: {
  limit: number;
  page: number;
  search: string;
}): Promise<any> => {
  const skip = (page - 1) * limit;

  if (limit > 100) {
    limit = 100;
  }

  const queryBuilder = ReferralRepositry.createQueryBuilder('referral');

  if (search) {
    queryBuilder
      .where('referral.referralEmail LIKE :search', { search: `%${search}%` })
      .orWhere('referral.referralName LIKE :search', { search: `%${search}%` })
      .orWhere('referral.referralPanelListId LIKE :search', {
        search: `%${search}%`,
      })
      .orWhere('referral.referralFriendEmail LIKE :search', {
        search: `%${search}%`,
      })
      .orWhere('referral.referralFriendName LIKE :search', {
        search: `%${search}%`,
      })
      .orWhere('referral.referralFriendPanelistId LIKE :search', {
        search: `%${search}%`,
      });
  }

  const [referrals, total] = await queryBuilder
    .orderBy('referral.createdAt', 'DESC')
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  return {
    referrals,
    metaData: {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    },
  };
};
