import { UserRespository } from '../../repositiries';
import { ApiError } from '../../utils/api-error';
import { FORSTA_PANELLIST } from '../forsta/constants';
import { getPanelVariablesService } from '../forsta/forsta.service';

export const getUserMembershipStatusService = async (userId: string) => {
  const user = await UserRespository.findOne({ where: { id: userId } });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const panelStatus = await getPanelVariablesService({
    panelProjectId: process.env.FORSTA_PANEL_ID!,
    userId: Number(user.forstaPanelistId),
    fieldNames: {
      string: [FORSTA_PANELLIST.MEMBERSHIP_STATUS],
    },
  });

  const userMembershipStatus = panelStatus?.GetPanelVariablesResult?.string[0];

  if (!userMembershipStatus) {
    throw new ApiError(500, 'Failed to fetch membership status');
  }

  if (user.forstaMemberStatus !== userMembershipStatus) {
    user.forstaMemberStatus = userMembershipStatus;
    await UserRespository.save(user);
  }

  return userMembershipStatus;
};
