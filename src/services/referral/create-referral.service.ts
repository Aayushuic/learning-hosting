import { In, EntityManager } from 'typeorm';
import { UserRespository } from '../../repositiries';
import { ReferralRepositry } from '../../repositiries/referral.repositry';
import { Referral, ReferralStatus } from '../../entities/referral.entity';
import { sendEmail } from '../email/email.service';
import { ApiError } from '../../utils/api-error';
import { REFER_A_FRIEND_EMAIL_LINK } from '../../constants/common.constants';
import { getReferAFriendEmailContent } from '../../templates/refer-a-friend.template';

export const createreferralService = async (
  friends: { friendName: string; friendEmail: string }[],
  id: string
) => {
  const currUser = await UserRespository.findOne({
    where: { id },
    relations: ['metaData'],
  });

  if (!currUser) {
    throw new ApiError(404, 'User not found');
  }

  const emails = friends.map((friend) => friend.friendEmail);

  const [existingUsers, existingReferrals] = await Promise.all([
    UserRespository.find({ where: { email: In(emails) } }),
    ReferralRepositry.find({
      where: {
        referralFriendEmail: In(emails),
        referralEmail: currUser.email,
      },
    }),
  ]);

  const existingUserEmails = new Set(
    existingUsers?.map((user) => user.email) || []
  );

  const alreadyReferredEmails = new Set(
    existingReferrals?.map((referral) => referral.referralFriendEmail) || []
  );

  const validationPromises = friends.map(async (friend) => {
    if (existingUserEmails.has(friend.friendEmail)) {
      throw new ApiError(
        400,
        `User with email ${friend.friendEmail} already signed up`
      );
    }

    if (alreadyReferredEmails.has(friend.friendEmail)) {
      throw new ApiError(
        400,
        `User with email ${friend.friendEmail} has already been referred`
      );
    }
  });

  await Promise.all(validationPromises);

  const referralCode = currUser.metaData.referralCode;

  const referralsToCreate = friends.map((friend) => {
    const referral = new Referral();
    referral.referralUserId = currUser.id;
    referral.referralPanelListId = currUser.forstaPanelistId;
    referral.referralName = currUser.name;
    referral.referralEmail = currUser.email;
    referral.referralFriendEmail = friend.friendEmail;
    referral.referralFriendName = friend.friendName;
    referral.referralStatus = ReferralStatus.NEW;
    referral.referralCode = referralCode;

    return referral;
  });

  const savedReferrals = await ReferralRepositry.manager.transaction(
    async (manager: EntityManager) => {
      return await manager.save(Referral, referralsToCreate);
    }
  );

  const emailPromises = savedReferrals.map(async (referral) => {
    const referralLink = `${REFER_A_FRIEND_EMAIL_LINK}?referral_code=${referral.referralCode}`;
    const content = getReferAFriendEmailContent(
      referral.referralFriendName,
      referral.referralName,
      referralLink
    );

    const subject = `You have been invited by ${referral.referralName}  to join HappyDot.sg!`;

    await sendEmail(referral.referralFriendEmail, subject, content);
  });

  try {
    await Promise.all(emailPromises);
    return;
  } catch (error) {
    /**  Temporarily commenting out the transaction logic for referral deletion
        If email sending fails, we may need to delete the referral records in the future.
        This can be re-enabled if business requirements change, such as ensuring data consistency
      between referral creation and email delivery (i.e., rollback on failure).
      For now, we are allowing the referral records to remain even if email fails.*/

    // await ReferralRepositry.manager.transaction(
    //   async (manager: EntityManager) => {
    //     await manager.remove(Referral, savedReferrals);
    //   }
    // );

    throw new ApiError(
      500,
      'Referral created successfully, but email could not be sent to some or all referrals.'
    );
  }
};
