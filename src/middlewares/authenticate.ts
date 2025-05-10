import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRespository } from '../repositiries';
import { ApiError } from '../utils/api-error';

const JWT_SECRET = process.env.JWT_LOGIN_SECRET;

interface JwtPayload {
  userId: string;
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    if (!JWT_SECRET) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error: No secret key found.',
      });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const { userId, email, isAdmin } = decoded as JwtPayload;

    const user = await UserRespository.existsByEmail(email);

    if (!user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    (req as any).user = {
      id: userId,
      email: email,
      isAdmin,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res
        .status(401)
        .json({ success: false, message: 'Unauthorized: Token expired' });
      return;
    } else if (error instanceof jwt.JsonWebTokenError) {
      res
        .status(401)
        .json({ success: false, message: 'Unauthorized: Invalid token' });
      return;
    } else {
      console.error('Unexpected error during token verification:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
      return;
    }
  }
};

export default isAuthenticated;
