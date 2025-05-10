import { CreateUserProfileDto } from '../../dtos/userProfile/create-user-profile.dto';
import { UserMetaDataRepository, UserRespository } from '../../repositiries';
import { ApiError } from '../../utils/api-error';

export const createProfileService = async (
  data: CreateUserProfileDto,
  id: string
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
    dateOfBirth,
    maritalStatus,
    gender,
    mobileNumber,
    race,
    citizenship,
  } = data;

  user.metaData.dateOfBirth = dateOfBirth;
  user.metaData.maritalStatus = maritalStatus;
  user.metaData.gender = gender;
  user.metaData.mobileNumber = mobileNumber;
  user.metaData.race = race;
  user.metaData.citizenship = citizenship;

  await UserMetaDataRepository.save(user.metaData);

  return user.metaData;
};
