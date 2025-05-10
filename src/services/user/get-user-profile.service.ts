import { UserRespository } from '../../repositiries';
import { ApiError } from '../../utils/api-error';

export const getUserProfileService = async (id: string) => {
  const user = await UserRespository.findOne({
    where: { id },
    relations: ['metaData', 'roles', 'roles.permissions', 'permissions'],
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

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
    metaData: user.metaData,
  };

  return payload;
};
