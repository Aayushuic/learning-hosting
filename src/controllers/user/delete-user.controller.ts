import { Request, Response } from 'express';
import { deleteUserService } from '../../services/user/delete-user.service';

export const deleteUserController = async (req: Request, res: Response) => {
  const { isAdmin, id } = (req as any).user;

  let userId;

  if (isAdmin) {
    userId = req.query.userId;
  } else {
    userId = id;
  }

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'User ID is required for admin actions.',
    });
  }

  await deleteUserService(userId);

  return res
    .status(200)
    .json({ success: true, message: 'User Deleted Successfully' });
};
