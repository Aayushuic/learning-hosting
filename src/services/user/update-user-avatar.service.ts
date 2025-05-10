import { UserRespository } from '../../repositiries';
import { ApiError } from '../../utils/api-error';

export const updateUserAvatarService = async (
  email: string,
  avatarId: string
) => {
  const user = await UserRespository.findOne({
    where: { email },
    relations: ['metaData'],
  });
  if (!user) {
    throw new ApiError(404, 'user not found');
  }

  if (user.metaData.avatarId === avatarId) {
    return {
      avatarId: user.metaData.avatarId,
    };
  }

  user.metaData.avatarId = avatarId;
  await UserRespository.save(user);
  return {
    avatarId: user.metaData.avatarId,
  };
};
