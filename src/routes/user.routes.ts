import express from 'express';
import {
  createProfileController,
  getAllUserProfileController,
  getProfileController,
  getSingleUserProfileController,
  updateProfileController,
  updateUserAvatarController,
} from '../controllers/user/user-profile.controller';
import { validateRequest } from '../middlewares/validate-request';
import { UpdateUserProfileDto } from '../dtos/userProfile/update-user-profile.dto';
import { wrapAsync } from '../utils/wrap-async';
import { CreateUserProfileDto } from '../dtos/userProfile/create-user-profile.dto';
import { changeNotificationSettingController } from '../controllers/notification';
import { changeNotificationSettingsDto } from '../dtos/userProfile/change-notification-settings.dto';
import { checkPermission } from '../middlewares/check-permission';
import { UuidParamDto } from '../dtos/common/uuid-param.dto';
import { OptionalUserUUIDQueryDto } from '../dtos/common/uuid-query-optional.dto';
import { deleteUserController } from '../controllers/user/delete-user.controller';
import { getUserMembershipStatusController } from '../controllers/user/get-user-membership-status.controller';
import { UserUuidParamDto } from '../dtos/common/user-uuid-param.dto';
import { permissionSlugs } from '../constants/permissions.constants';
import { UpdateUserAvatarDto } from '../dtos/userProfile/update-user-avatar.dto';
const router = express.Router();

router
  .route('/')
  .delete(
    validateRequest(OptionalUserUUIDQueryDto),
    wrapAsync(deleteUserController)
  );

router
  .route('/:userId/membership-status')
  .get(
    validateRequest(UserUuidParamDto, 'params'),
    checkPermission(permissionSlugs.CHECK_USER_STATUS),
    wrapAsync(getUserMembershipStatusController)
  );

router
  .route('/profile')
  .patch(
    validateRequest(UpdateUserProfileDto),
    validateRequest(OptionalUserUUIDQueryDto, 'query'),
    wrapAsync(updateProfileController)
  )
  .get(
    validateRequest(OptionalUserUUIDQueryDto, 'query'),
    wrapAsync(getProfileController)
  )
  .post(
    validateRequest(OptionalUserUUIDQueryDto, 'query'),
    validateRequest(CreateUserProfileDto),
    wrapAsync(createProfileController)
  );

router.put(
  '/profile/avatar',
  validateRequest(UpdateUserAvatarDto),
  wrapAsync(updateUserAvatarController)
);

router
  .route('/profiles')
  .get(
    checkPermission(permissionSlugs.VIEW_ALL_PROFILE),
    wrapAsync(getAllUserProfileController)
  );

router
  .route('/profile/notification')
  .patch(
    validateRequest(changeNotificationSettingsDto),
    wrapAsync(changeNotificationSettingController)
  );

router
  .route('/profile/:id')
  .get(
    validateRequest(UuidParamDto, 'params'),
    checkPermission(permissionSlugs.VIEW_PROFILE),
    wrapAsync(getSingleUserProfileController)
  );

export default router;
