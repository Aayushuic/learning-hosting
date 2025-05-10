import { OTPVerifyDto } from '../../dtos/auth/otp-verify.dto';
import { UserRespository } from '../../repositiries';
import { OTPRepository } from '../../repositiries/otp.repositry';
import { ApiError } from '../../utils/api-error';
import { getJWTToken } from '../../utils/get-jwt-token';
import { otpVerification } from '../../utils/verify-otp';

export const loginOtpVerificationService = async ({
  purpose,
  email,
  code,
}: OTPVerifyDto) => {
  await otpVerification({ purpose, email, code });

  const user = await UserRespository.findOne({
    where: { email },
    relations: ['roles', 'roles.permissions', 'permissions'],
  });

  if (!user) {
    return new ApiError(404, 'User not found');
  }

  user.isVerified = true;
  user.loginAttempts = 0;
  await UserRespository.save(user);

  const directPermissions = user.permissions.map(
    (permission) => permission.slug
  );

  const rolePermissions = user.roles.flatMap((role) =>
    role.permissions.map((permission) => permission.slug)
  );

  const allPermissions = [...directPermissions, ...rolePermissions];

  const uniquePermissions = Array.from(new Set(allPermissions));

  const payload = {
    email: user.email,
    name: user.name,
    isActive: user.isActive,
    roles: user.roles.map((role) => role.name),
    permissions: uniquePermissions,
    membershipStatus: user.forstaMemberStatus,
    lifestyleStatus: user.forstaLifestyleStatus,
    panelListID: user.forstaPanelistId,
  };

  const token = getJWTToken(user);

  return {
    userData: payload,
    token,
  };
};
