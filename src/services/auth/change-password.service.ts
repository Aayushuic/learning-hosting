import { ChangePasswordDto } from '../../dtos/auth/change-password.dto';
import { UserRespository } from '../../repositiries/user.repositry';
import { ApiError } from '../../utils/api-error';
import bcrypt from 'bcryptjs';

export const changePasswordService = async (
  { newPassword }: ChangePasswordDto,
  email: string
) => {
  const user = await UserRespository.findByEmail(email);

  if (!user) {
    throw new ApiError(400, 'invalid credentials');
  }

  const isEqualToPreviousPassword = await bcrypt.compare(
    newPassword,
    user.password
  );

  if (isEqualToPreviousPassword) {
    throw new ApiError(
      400,
      'New password should be different from last password'
    );
  }

  const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10', 10);
  const newHashPassword = await bcrypt.hash(newPassword, saltRounds);

  user.password = newHashPassword;
  await UserRespository.save(user);

  return;
};
