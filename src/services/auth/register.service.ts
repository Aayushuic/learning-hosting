import bcrypt from 'bcryptjs';
import { RegisterDto } from '../../dtos/auth/register.dto';
import { Response } from 'express';
import { UserMetaDataRepository, UserRespository } from '../../repositiries';
import {
  createPanelListService,
  getPanelVariablesService,
} from '../forsta/forsta.service';
import { FORSTA_PANELLIST } from '../forsta/constants';
import { ApiError } from '../../utils/api-error';
import { ReferralRepositry } from '../../repositiries/referral.repositry';
import { RoleRepository } from '../../repositiries/role.repositrty';

import { User } from '../../entities/user.entity';
import { generateReferralCode } from '../../utils/generate-referral';
import { Not } from 'typeorm';
import { getSignupSuccessEmailContent } from '../../templates/sign-up-template';
import { sendEmail } from '../email/email.service';

export const WpRegisterService = async (registerDto: RegisterDto) => {
  const {
    fullName,
    email,
    password,
    referralCode,
    utmString,
    campaignId,
    source,
  } = registerDto;
  let referredByPanelistID = '';
  let referredByEmail = undefined;
  let referralData = null;

  const existingUser = await UserRespository.findByEmail(email);
  if (existingUser) {
    throw new ApiError(409, 'user already exits with given email address');
  }

  if (referralCode) {
    referralData = await ReferralRepositry.findOne({
      where: { referralCode, referralFriendEmail: email },
    });

    if (referralData) {
      referredByPanelistID = referralData.referralPanelListId;
      referredByEmail = referralData.referralEmail;
    }
  }

  const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10', 10);
  const hashPassword = await bcrypt.hash(password, saltRounds);

  const { CreatePanelistResult: newUserPanelListId } =
    await createPanelListService({
      panelProjectId: process.env.FORSTA_PANEL_ID || '',
      fieldNames: {
        string: [
          FORSTA_PANELLIST.FULLNAME,
          FORSTA_PANELLIST.EMAIL,
          FORSTA_PANELLIST.PASSWORD,
          FORSTA_PANELLIST.LIFESTYLE_SURVEY_UPDATE_FLAG,
          FORSTA_PANELLIST.UPDATE_PROFILE_FLAG,
          FORSTA_PANELLIST.DATE_WHEN_MEMBERSHIP_STARTED,
          FORSTA_PANELLIST.SOURCE,
          FORSTA_PANELLIST.CAMPAIGN_ID,
          FORSTA_PANELLIST.SOURCE_OTHERS,
          FORSTA_PANELLIST.UTM_CODE,
        ],
      },
      fieldValues: {
        string: [
          fullName,
          email,
          hashPassword,
          '2',
          '2',
          new Date().toISOString(),
          source,
          campaignId,
          referredByPanelistID,
          utmString,
        ],
      },
    });

  if (newUserPanelListId <= 0) {
    throw new ApiError(
      500,
      'unable to register user with forsta,please try again later'
    );
  }

  if (referralData) {
    referralData.referralFriendName = fullName;
    referralData.referralFriendPanelistId = newUserPanelListId.toString();

    await ReferralRepositry.save(referralData);
  }

  const panelStatus: any = await getPanelVariablesService({
    panelProjectId: process.env.FORSTA_PANEL_ID || '',
    userId: newUserPanelListId,
    fieldNames: {
      string: [
        FORSTA_PANELLIST.EMAIL,
        FORSTA_PANELLIST.MEMBERSHIP_STATUS,
        FORSTA_PANELLIST.LIFESTYLE_SURVEY_UPDATE_FLAG,
      ],
    },
  });

  const panelVars = panelStatus?.GetPanelVariablesResult?.string;

  const [_, memberStatus = null, lifestyleStatus = null] = panelVars;

  let userRole = await RoleRepository.findOne({ where: { name: 'user' } });

  if (!userRole) {
    throw new Error('Role "User" not found');
  }

  const userReferralCode = generateReferralCode(
    process.env.REFERRAL_PREFIX,
    parseInt(process.env.REFERRAL_CODE_SIZE || '6')
  );

  const userMetaData = UserMetaDataRepository.create({
    utmString: utmString,
    campaignId: campaignId,
    referralCode: userReferralCode,
    refferredBy: referredByEmail,
  });

  const user = UserRespository.create({
    email,
    name: fullName,
    password: hashPassword,
    forstaLifestyleStatus: memberStatus,
    forstaMemberStatus: lifestyleStatus,
    forstaPanelistId: newUserPanelListId.toString(),
    roles: [userRole],
    metaData: userMetaData,
  });

  const userData: User = await UserRespository.save(user);

  await ReferralRepositry.delete({
    referralFriendEmail: user.email,
    referralCode: Not(referralCode),
  });

  // sending mail
  if (campaignId === 'eplwa-signup') {
    const content = getSignupSuccessEmailContent(fullName, 'eplwa', '');
    await sendEmail(email, 'Thank you for signing up HappyDot.sg', content);
  } else if (campaignId === 'ntutouchattack') {
    const content = getSignupSuccessEmailContent(
      fullName,
      'ntutouchattack',
      ''
    );
    await sendEmail(
      email,
      'Friends of NTU Touch Attack 2024 - Complete Your HappyDot.sg Registration ',
      content
    );
  } else if (campaignId === 'become-a-happydotter') {
    const content = getSignupSuccessEmailContent(
      fullName,
      'become-a-happydotter',
      ''
    );
    await sendEmail(email, 'Thank you for signing up HappyDot.sg', content);
  } else {
    // have to send default mail here.
  }

  return;
};
