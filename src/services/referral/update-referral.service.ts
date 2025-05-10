import { UpdateReferralDto } from '../../dtos/referral/update-referral.dto';
import { ReferralRepositry } from '../../repositiries/referral.repositry';
import { ApiError } from '../../utils/api-error';

export const updateReferralService = async (
  referralId: string,
  referralData: UpdateReferralDto
) => {
  const referral = await ReferralRepositry.findOne({
    where: { id: referralId },
  });
  if (!referral) {
    throw new ApiError(404, 'Referral not found');
  }

  referral.pointsEarned = referralData.pointsEarned;

  await ReferralRepositry.save(referral);
  return referral;
};
