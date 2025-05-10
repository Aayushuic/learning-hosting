import express from 'express';
import { validateRequest } from '../middlewares/validate-request';
import { CreateRewardDto } from '../dtos/reward/create-reward.dto';
import { imageUpload } from '../utils/upload-image';
import { wrapAsync } from '../utils/wrap-async';
import {
  createRewardController,
  getAllRewardController,
  updateRewardController,
} from '../controllers/reward';
import { GetRewardDto } from '../dtos/reward/get-reward.dto';
import { UuidParamDto } from '../dtos/common/uuid-param.dto';
import { UpdateRewardDto } from '../dtos/reward/update-reward.dto';
import { deleteRewardController } from '../controllers/reward/delete-reward.controller';
import { getRewardByIdController } from '../controllers/reward/get-reward-by-id.controller';
import { checkPermission } from '../middlewares/check-permission';
import { CreateRewardProviderDto } from '../dtos/reward/create-reward-provider.dto';
import { createRewardProviderController } from '../controllers/reward/reward-provider/create-reward-provider.controller';
import { permissionSlugs } from '../constants/permissions.constants';
import { getRewardProviderController } from '../controllers/reward/reward-provider/get-reward-provider.controller';
import { UpdateRewardProviderDto } from '../dtos/reward/update-reward-provider.dto';
import { updateRewardProviderController } from '../controllers/reward/reward-provider/update-reward-provider.controller';
import { UuidRewardProviderParamDto } from '../dtos/common/reward-provider-param.dto';
import { deleteRewardProviderController } from '../controllers/reward/reward-provider/delete-reward-provider.controller';

const router = express.Router();

/** reward create and get */
router.post(
  '/',
  validateRequest(CreateRewardDto, 'query'),
  checkPermission(permissionSlugs.CREATE_REWARD),
  imageUpload.single('image'),
  wrapAsync(createRewardController)
);
router.get(
  '/',
  validateRequest(GetRewardDto, 'query'),
  wrapAsync(getAllRewardController)
);

/** reward provider get and create  */
router
  .route('/provider')
  .post(
    validateRequest(CreateRewardProviderDto),
    checkPermission(permissionSlugs.CREATE_REWARD_PROVIDER),
    wrapAsync(createRewardProviderController)
  )
  .get(
    checkPermission(permissionSlugs.VIEW_REWARD_PROVIDER),
    wrapAsync(getRewardProviderController)
  );

/** reward provider update and delete  */
router
  .route('/:rewardProviderId/provider')
  .patch(
    validateRequest(UuidRewardProviderParamDto, 'params'),
    validateRequest(UpdateRewardProviderDto),
    checkPermission(permissionSlugs.UPDATE_REWARD_PROVIDER),
    wrapAsync(updateRewardProviderController)
  )
  .delete(
    validateRequest(UuidRewardProviderParamDto, 'params'),
    checkPermission(permissionSlugs.DELETE_REWARD_PROVIDER),
    wrapAsync(deleteRewardProviderController)
  );

/** update,delete and (get reward by id) here  */
router
  .route('/:id')
  .patch(
    validateRequest(UuidParamDto, 'params'),
    validateRequest(UpdateRewardDto, 'query'),
    checkPermission(permissionSlugs.UPDATE_REWARD),
    imageUpload.single('image'),
    wrapAsync(updateRewardController)
  )
  .delete(
    validateRequest(UuidParamDto, 'params'),
    checkPermission(permissionSlugs.DELETE_REWARD),
    wrapAsync(deleteRewardController)
  )
  .get(
    validateRequest(UuidParamDto, 'params'),
    wrapAsync(getRewardByIdController)
  );

export default router;
