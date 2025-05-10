import { UserRespository } from '../../repositiries';
import { ApiError } from '../../utils/api-error';

export const getSingleUserProfileService = async (id: string) => {
  const user = await UserRespository.findOne({
    where: { id },
    relations: ['metaData'],
  });

  if (!user) {
    throw new ApiError(404, 'user not found');
  }

  delete (user as { password?: string }).password;

  return user;
};
