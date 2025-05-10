import { Request, Response } from 'express';
import { updateProfileService } from '../../services/user/update-profile.service';
import { getUserProfileService } from '../../services/user/get-user-profile.service';
import { createProfileService } from '../../services/user/create-user-profile.service';
import { getAllUserProfileService } from '../../services/user/get-all-user-profile.service';
import { getSingleUserProfileService } from '../../services/user/get-single-user-profile.service';
import { updateUserAvatarService } from '../../services/user/update-user-avatar.service';

export const updateProfileController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id, isAdmin } = (req as any).user;

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

  const data = req.body;
 

  const result = await updateProfileService(data, userId, isAdmin);

  return res.status(200).json({
    success: true,
    message: 'profile updated successfully',
    data: result,
  });
};

export const getProfileController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id, isAdmin } = (req as any).user;

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

  const data = await getUserProfileService(userId);

  return res.status(200).json({
    success: true,
    message: 'user profile fetch successfully',
    data,
  });
};

export const createProfileController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id, isAdmin } = (req as any).user;

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

  const data = req.body;

  const result = await createProfileService(data, userId);

  return res.status(200).json({
    success: true,
    message: 'user profile fetch successfully',
    result,
  });
};

export const getAllUserProfileController = async (
  req: Request,
  res: Response
) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  const search = (req.query.search as string)?.trim() || '';

  const result = await getAllUserProfileService({ limit, page, search });
  return res.status(200).json({
    success: true,
    message: 'user profiles fetch successfully',
    data: result,
  });
};

export const getSingleUserProfileController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  const result = await getSingleUserProfileService(id);

  return res.status(200).json({
    success: true,
    message: 'user profile fetch successfully',
    data: result,
  });
};

export const updateUserAvatarController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = (req as any).user;
  const { avatarId } = req.body;
  const data = await updateUserAvatarService(email, avatarId);

  return res
    .status(200)
    .json({ success: true, message: 'Avatar Updated Successfully', data });
};
