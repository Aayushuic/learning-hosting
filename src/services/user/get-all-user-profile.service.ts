import { User } from '../../entities/user.entity';
import { UserRespository } from '../../repositiries';

export const getAllUserProfileService = async ({
  limit,
  page,
  search,
}: {
  limit: number;
  page: number;
  search: string;
}): Promise<any> => {
  const skip = (page - 1) * limit;

  if (limit > 100) {
    limit = 100;
  }

  const queryBuilder = UserRespository.createQueryBuilder('user')
    .leftJoinAndSelect('user.metaData', 'metaData')
    .orderBy('user.createdAt', 'DESC');

  if (search) {
    queryBuilder
      .where('user.name ILIKE :search', { search: `%${search}%` })
      .orWhere('user.email ILIKE :search', { search: `%${search}%` })
      .orWhere('user.forstaPanelistId ILIKE :search', {
        search: `%${search}%`,
      });
  }

  const [users, total] = await queryBuilder
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  users.forEach((user: User) => {
    delete (user as { password?: string }).password;
  });

  const totalPages = Math.ceil(total / limit);

  return {
    data: users,
    meta: {
      limit,
      page,
      totalItems: total,
      totalPages,
    },
  };
};
