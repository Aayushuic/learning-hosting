import { send } from 'process';
import { ReferralRepositry } from '../../repositiries/referral.repositry';
import { ApiError } from '../../utils/api-error';
import { sendEmail } from '../email/email.service';

import { REFER_A_FRIEND_EMAIL_LINK } from '../../constants/common.constants';
import { getReferAFriendEmailContent } from '../../templates/refer-a-friend.template';

export const resendReferralEmailService = async (
  referralId: string
): Promise<String> => {
  const referral = await ReferralRepositry.findOne({
    where: { id: referralId },
  });

  if (!referral) {
    throw new ApiError(404, 'Referral not found');
  }

  const referralLink = `${REFER_A_FRIEND_EMAIL_LINK}?referral_code=${referral.referralCode}`;
  const content = getReferAFriendEmailContent(
    referral.referralFriendName,
    referral.referralName,
    referralLink
  );

  const subject = `You have been invited by ${referral.referralName}  to join HappyDot.sg!`;

  await sendEmail(referral.referralFriendEmail, subject, content);

  return referral.referralFriendName;
};
