import { UserRespository } from '../../repositiries';
import { ApiError } from '../../utils/api-error';
import {
  deletePanelistService,
  getPanelVariablesService,
} from '../forsta/forsta.service';

export const deleteUserService = async (id: string) => {
  const user = await UserRespository.findOne({ where: { id } });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const { DeletePanelistResult }: any = await deletePanelistService({
    projectId: process.env.FORSTA_PANEL_ID!,
    panelistId: Number(user.forstaPanelistId),
  });

  if (DeletePanelistResult !== 1) {
    throw new ApiError(500, 'Unable to delete User from frosta');
  }

  await UserRespository.delete(user.id);
  return;
};
