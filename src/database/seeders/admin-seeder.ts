import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import { Permission } from '../../entities/permission.entity';
import { UserMetaData } from '../../entities/user-meta-data.entity';
import { AppDataSource } from '../data-source';
import bcrypt from 'bcryptjs';
import { PERMISSIONS_DATA } from '../../constants/permissions.constants';

export class AdminSeeder {
  static async run() {
    if (process.env.ENV !== 'Development') {
      console.log('Seeder skipped: Not in development environment');
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);
    const permissionRepository = AppDataSource.getRepository(Permission);
    const userMetaDataRepository = AppDataSource.getRepository(UserMetaData);

    // Create or find permissions
    const permissions = await Promise.all(
      PERMISSIONS_DATA.map(async (data) => {
        let permission = await permissionRepository.findOneBy({
          slug: data.slug,
        });
        if (!permission) {
          permission = permissionRepository.create(data);
          await permissionRepository.save(permission);
          console.log(`✅ Permission created: ${data.slug}`);
        }
        return permission;
      })
    );

    // Filter permissions for the user role (only 'view' actions)
    const viewPermissions = permissions.filter((p) =>
      PERMISSIONS_DATA.some(
        (data) => data.slug === p.slug && data.action === 'view'
      )
    );

    // Create or find Roles
    const adminRole = await (async () => {
      let role = await roleRepository.findOne({
        where: { name: 'admin' },
        relations: ['permissions'],
      });
      if (!role) {
        role = roleRepository.create({ name: 'admin', permissions });
        await roleRepository.save(role);
        console.log('✅ Role created: admin');
      }
      return role;
    })();

    const userRole = await (async () => {
      let role = await roleRepository.findOne({
        where: { name: 'user' },
        relations: ['permissions'],
      });
      if (!role) {
        role = roleRepository.create({
          name: 'user',
          permissions: viewPermissions,
        });
        await roleRepository.save(role);
        console.log('✅ Role created: user');
      }
      return role;
    })();

    // Create or find Admin User
    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@example.com' },
      relations: ['metaData'],
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      const adminMetaData = userMetaDataRepository.create({
        utmString: 'utm_admin_example',
        referralCode: 'REF12349',
        smsNotification: true,
        newsUpdateNotification: true,
      });

      const adminUser = userRepository.create({
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin',
        roles: [adminRole],
        forstaPanelistId: '1',
        metaData: adminMetaData,
      });

      await userRepository.save(adminUser);
      console.log('✅ Admin user seeded: admin@example.com / admin123');
    } else {
      console.log('Admin user already exists. Skipping admin creation.');
    }

    // Create or find Normal User
    const existingUser = await userRepository.findOne({
      where: { email: 'user@example.com' },
      relations: ['metaData'],
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('user123', 10);

      // Create normal user metadata
      const userMetaData = userMetaDataRepository.create({
        utmString: 'utm_user_example',
        referralCode: 'REF12345',
        smsNotification: true,
        newsUpdateNotification: true,
      });

      // Create normal user with the associated metadata
      const normalUser = userRepository.create({
        email: 'user@example.com',
        password: hashedPassword,
        name: 'User',
        roles: [userRole],
        forstaPanelistId: '2',
        metaData: userMetaData,
      });

      await userRepository.save(normalUser);
      console.log('✅ Normal user seeded: user@example.com / user123');
    } else {
      console.log('Normal user already exists. Skipping user creation.');
    }
  }
}
