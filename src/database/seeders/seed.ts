import { AdminSeeder } from './admin-seeder';

export const runSeeders = async () => {
  await AdminSeeder.run();
};
