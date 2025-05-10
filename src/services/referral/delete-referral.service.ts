import { ReferralRepositry } from '../../repositiries/referral.repositry';
import { ApiError } from '../../utils/api-error';

export const deleteReferralService = async (referralId: string) => {
  const result = await ReferralRepositry.delete(referralId);
  if (result.affected === 0) {
    throw new ApiError(404, 'Referral not found');
  }
  return;
};
