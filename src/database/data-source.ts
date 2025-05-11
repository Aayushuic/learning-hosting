import { DataSource } from 'typeorm';
import path from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  // host: process.env.DB_HOST || 'localhost',
  url: process.env.DB_URL,
  // port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  // username: process.env.DB_USERNAME || 'postgres',
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME || 'happyDot',
  synchronize: process.env.ENV === 'Development' ? true : false,
  logging: false,
  ssl: {
    rejectUnauthorized: false, // This is required for Render PostgreSQL
  },
  entities: [__dirname, 'src/entities/**/*.{ts,js}'],
  migrations: [__dirname, '/migrations/**/*.{ts,js}'],
  subscribers: [],
});
