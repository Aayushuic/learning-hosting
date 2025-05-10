import { AppDataSource } from '../database/data-source';
import { UserMetaData } from '../entities/user-meta-data.entity';
import { User } from '../entities/user.entity';

export const UserRespository = AppDataSource.getRepository(User).extend({
  /**
   * Find a user by email.
   * @param email - The email of the user to find.
   * @returns The user entity or null if not found.
   */
  async findByEmail(email: string): Promise<User | null> {
    return await this.findOne({ where: { email } });
  },
  /**
   * Find a user by id.
   * @param id - The id of the user to find.
   * @returns The user entity or null if not found.
   */
  async findById(id: string): Promise<User | null> {
    return await this.findOne({ where: { id } });
  },
  /**
   * Find a user by id.
   * @param email - The email of the user to find.
   * @returns boolean true and false.
   */
  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.count({ where: { email } });
    return count > 0;
  },
});

export const UserMetaDataRepository = AppDataSource.getRepository(UserMetaData);
