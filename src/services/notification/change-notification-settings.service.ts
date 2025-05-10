import { changeNotificationSettingsDto } from '../../dtos/userProfile/change-notification-settings.dto';
import { UserMetaDataRepository, UserRespository } from '../../repositiries';
import { ApiError } from '../../utils/api-error';
import { FORSTA_PANELLIST } from '../forsta/constants';
import { updatePanelistVariableService } from '../forsta/forsta.service';

export const changeNotificationSettingService = async (
  data: changeNotificationSettingsDto,
  email: string
) => {
  const user = await UserRespository.findOne({
    where: { email },
    relations: ['metaData'],
  });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const formattedSmsNotification = data.smsNotification ? '1' : '0';
  const formattedUpdateNotification = data.newsUpdateNotification ? '1' : '0';

  if (user.forstaPanelistId) {
    const currentDate = new Date().toISOString();
    const result: any = await updatePanelistVariableService({
      panelProjectId: process.env.FORSTA_PANEL_ID || '',
      userId: Number(user.forstaPanelistId),
      fieldNames: {
        string: [
          FORSTA_PANELLIST.SMS_NOTIFICATION,
          FORSTA_PANELLIST.NEWS_AND_UPDATE,
          FORSTA_PANELLIST.UPDATE_PROFILE_DATE,
        ],
      },
      fieldValues: {
        string: [
          formattedSmsNotification,
          formattedUpdateNotification,
          currentDate,
        ],
      },
    });

    if (!result || result?.UpdatePanelVariablesResult !== 0) {
      throw new ApiError(500, 'Update notification failed');
    }
  }

  user.metaData.smsNotification = data.smsNotification;
  user.metaData.newsUpdateNotification = data.newsUpdateNotification;

  await UserMetaDataRepository.save(user.metaData);
  return;
};
