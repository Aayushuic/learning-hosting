import jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';

const JWT_SECRET = process.env.JWT_LOGIN_SECRET;
const JWT_Expires_In: string = process.env.JWT_LOGIN_EXPIRES_IN || '604800';

export const getJWTToken = (user: User): string => {
  if (!JWT_SECRET) {
    throw new Error('unable to get environment variable');
  }

  const isAdmin = user.roles?.some((role) => role.name === 'admin') || false;

  const token = jwt.sign(
    { userId: user.id, email: user.email, isAdmin },
    JWT_SECRET as string,
    {
      expiresIn: parseInt(JWT_Expires_In),
    }
  );

  return token;
};
