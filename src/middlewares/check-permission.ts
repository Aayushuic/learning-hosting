import { Request, Response, NextFunction } from 'express';

import { User } from '../entities/user.entity';
import { AppDataSource } from '../database/data-source';

export function checkPermission(requiredPermission: string) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id, isAdmin } = (req as any).user;

      if (!id) {
        return res
          .status(401)
          .json({ success: false, message: 'Unauthorized' });
      }

      if (isAdmin) {
        next();
        return;
      }

      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOne({
        where: { id },
        relations: ['roles', 'roles.permissions', 'permissions'],
      });

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: 'Unauthorized' });
      }

      const userPermissions = user.permissions.map((p) => p.slug);

      const rolePermissions = user.roles.flatMap((role) =>
        role.permissions.map((p) => p.slug)
      );

      const allPermissions = new Set([...userPermissions, ...rolePermissions]);

      if (!allPermissions.has(requiredPermission)) {
        return res
          .status(403)
          .json({ success: false, message: 'Forbidden: No permission' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
}
