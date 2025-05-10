import 'dotenv/config';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { AppDataSource } from './database/data-source';
import cors from 'cors';
import { errorHandler } from './middlewares/error-handler';
import { AdminSeeder } from './database/seeders/admin-seeder';
import path from 'path';
import MainRouter from './router';

const app = express();
const port = process.env.DEV_PORT || 8080;
const ENV = process.env.ENV || 'Development';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/api/v1', MainRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('server is running..');
});

app.use(errorHandler);

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
    await AdminSeeder.run();
  })
  .catch((err) => {
    console.error('Error during database initialization:', err);
  });
