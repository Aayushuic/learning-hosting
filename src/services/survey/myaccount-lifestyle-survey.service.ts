import { FORSTA_ACCOUNT_LIFESTYLE_RETURN_URL } from '../../constants/common.constants';
import { UserRespository } from '../../repositiries';
import { ApiError } from '../../utils/api-error';
import { FORSTA_PANELLIST } from '../forsta/constants';
import { getUpdateProfileSurveyUrl } from '../forsta/forsta.service';

export const myAccountLifeStyleSurveyService = async (
  email: string,
  surveyId?: string,
  surveyPoint?: number
) => {
  if (!process.env.FORSTA_LIFESTYLE_PANEL_ID || !process.env.FORSTA_PANEL_ID) {
    throw new ApiError(500, 'Unable to access environment variables');
  }
  const user = await UserRespository.findByEmail(email);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (!user.forstaPanelistId) {
    throw new ApiError(400, 'User panelist ID not found');
  }

  const result = (await getUpdateProfileSurveyUrl({
    panelId: process.env.FORSTA_PANEL_ID,
    panelistId: Number(user.forstaPanelistId),
    [FORSTA_PANELLIST.LANGUAGE]: FORSTA_ACCOUNT_LIFESTYLE_RETURN_URL,
    [FORSTA_PANELLIST.RETURN_URL]: FORSTA_ACCOUNT_LIFESTYLE_RETURN_URL,
    [FORSTA_PANELLIST.UPDATE_PROFILE_PROJECT_ID]:
      process.env.FORSTA_LIFESTYLE_PANEL_ID,
  })) as { GetUpdateProfileSurveyUrlResult: string };

  return {
    redirectUrl: result.GetUpdateProfileSurveyUrlResult,
  };
};
