import { UpdateUserProfileDto } from '../../dtos/userProfile/update-user-profile.dto';
import { ReferralStatus } from '../../entities/referral.entity';
import { User } from '../../entities/user.entity';
import { UserMetaDataRepository, UserRespository } from '../../repositiries';
import { ReferralRepositry } from '../../repositiries/referral.repositry';
import { getReferralStatusChangeTemplate } from '../../templates/refferal-status-change.template';
import { ApiError } from '../../utils/api-error';
import { calculateAge } from '../../utils/calculate-age';
import { mapFieldToCode } from '../../utils/field-mapping';
import { sendEmail } from '../email/email.service';
import { FORSTA_PANELLIST } from '../forsta/constants';
import { updatePanelistVariableService } from '../forsta/forsta.service';

export const updateProfileService = async (
  data: UpdateUserProfileDto,
  id: string,
  isAdmin?: boolean
) => {
  const user = await UserRespository.findOne({
    where: { id },
    relations: ['metaData'],
  });
  if (!user) {
    throw new ApiError(404, 'User with given email not found');
  }

  if (!user.metaData) {
    throw new ApiError(404, 'userMetaData not found');
  }

  const {
    dateOfBirth = user.metaData.dateOfBirth,
    maritalStatus = user.metaData.maritalStatus,
    gender = user.metaData.gender,
    mobileNumber = user.metaData.mobileNumber,
    race = user.metaData.race,
    isActive,
    citizenship = user.metaData.citizenship,
    smsNotification = user.metaData.smsNotification,
    newsAndUpdatesViaEmail = user.metaData.newsUpdateNotification,
    raceDetails,
  } = data;

  if (isActive !== undefined && isAdmin) {
    user.isActive = isActive;
    user.loginAttempts = 0;
    await UserRespository.save(user);
    return;
  }

  const isSmsNotificationOn = smsNotification ? '1' : '0';

  const isNewsAndUpdateOn = newsAndUpdatesViaEmail ? '1' : '0';

  const formattedMaritalStatus = mapFieldToCode('maritalStatus', maritalStatus);
  const formattedGender = mapFieldToCode('gender', gender);
  const formattedRace = mapFieldToCode('race', race);
  const formattedCitizenship = mapFieldToCode('citizenship', citizenship);

  if (user.forstaPanelistId) {
    const currentDate = new Date().toISOString();
    const result: any = await updatePanelistVariableService({
      panelProjectId: process.env.FORSTA_PANEL_ID || '',
      userId: Number(user.forstaPanelistId),
      fieldNames: {
        string: [
          FORSTA_PANELLIST.FULLNAME,
          FORSTA_PANELLIST.EMAIL,
          FORSTA_PANELLIST.DATE_OF_BIRTH,
          FORSTA_PANELLIST.MOBILE_NUMBER,
          FORSTA_PANELLIST.GENDER,
          FORSTA_PANELLIST.RACE,
          FORSTA_PANELLIST.CITIZENSHIP,
          FORSTA_PANELLIST.MARITAL_STATUS,
          FORSTA_PANELLIST.SMS_NOTIFICATION,
          FORSTA_PANELLIST.NEWS_AND_UPDATE,
          FORSTA_PANELLIST.UPDATE_PROFILE_FLAG,
          FORSTA_PANELLIST.UPDATE_PROFILE_DATE,
          FORSTA_PANELLIST.RACE_DETAILED,
        ],
      },
      fieldValues: {
        string: [
          user.name,
          user.email,
          dateOfBirth,
          mobileNumber,
          formattedGender,
          formattedRace,
          formattedCitizenship,
          formattedMaritalStatus,
          isSmsNotificationOn,
          isNewsAndUpdateOn,
          '1',
          currentDate,
          raceDetails,
        ],
      },
    });

    if (!result || result?.UpdatePanelVariablesResult !== 0) {
      throw new ApiError(500, 'User Updation Failed');
    }
  }

  if (user.metaData.refferredBy && dateOfBirth) {
    const referralRecord = await ReferralRepositry.findOne({
      where: {
        referralEmail: user.metaData.refferredBy,
        referralFriendEmail: user.email,
        referralActivated: false,
      },
    });

    const userAge = calculateAge(dateOfBirth);

    if (referralRecord) {
      (referralRecord.referralFriendAge = userAge),
        (referralRecord.referralStatus = ReferralStatus.AWAIT_CREDIT);
      referralRecord.referralActivated = true;

      await ReferralRepositry.save(referralRecord);

      const { subject, html } = getReferralStatusChangeTemplate(
        user.name,
        ReferralStatus.NEW,
        ReferralStatus.AWAIT_CREDIT,
        referralRecord.pointsEarned
      );

      if (process.env.ADMIN_EMAIL) {
        await sendEmail(process.env.ADMIN_EMAIL, subject, html);
      }
    }
  }

  if (dateOfBirth) user.metaData.dateOfBirth = dateOfBirth;
  if (maritalStatus) user.metaData.maritalStatus = maritalStatus;
  if (gender) user.metaData.gender = gender;
  if (mobileNumber) user.metaData.mobileNumber = mobileNumber;
  if (race) user.metaData.race = race;
  if (citizenship) user.metaData.citizenship = citizenship;
  if (smsNotification) user.metaData.smsNotification = smsNotification;
  if (newsAndUpdatesViaEmail)
    user.metaData.newsUpdateNotification = newsAndUpdatesViaEmail;

  user.metaData.isProfileCompleted = true;

  if (race === 'others') {
    user.metaData.raceDetails = raceDetails;
  }

  await UserMetaDataRepository.save(user.metaData);

  return user.metaData;
};
