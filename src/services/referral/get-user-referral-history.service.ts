import { ReferralRepositry } from '../../repositiries/referral.repositry';
import { Between } from 'typeorm';

export const getUserReferralHistoryService = async (
  userId: string,
  from: string,
  to: string,
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;
  const take = limit;

  const where = {
    referralUserId: userId,
    createdAt: Between(new Date(from), new Date(to)),
  };

  const [referrals, totalItems] = await ReferralRepositry.findAndCount({
    where,
    skip,
    take,
    order: { createdAt: 'DESC' },
  });

  const totalPages = Math.ceil(totalItems / limit);

  const transformedReferrals = referrals.map((referral) => ({
    referredId: referral.id,
    referredTo: referral.referralFriendEmail,
    referredFriendName: referral.referralFriendName,
    referralStatus: referral.referralStatus,
    pointsEarned: referral.pointsEarned,
  }));

  return {
    referrals: transformedReferrals,
    metaData: {
      totalItems,
      totalPages,
      currentPage: page,
    },
  };
};
