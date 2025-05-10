import express from 'express';

import { wrapAsync } from '../utils/wrap-async';
import { validateRequest } from '../middlewares/validate-request';
import { CreateReferralDto } from '../dtos/referral/create-referral.dto';
import { checkPermission } from '../middlewares/check-permission';
import { UuidParamDto } from '../dtos/common/uuid-param.dto';
import {
  createReferralController,
  getAllReferralController,
  getUserReferralHistoryController,
  resendReferralEmailController,
  updateReferralController,
} from '../controllers/referral';
import { deleteReferralController } from '../controllers/referral/delete-referral.controller';
import { UpdateReferralDto } from '../dtos/referral/update-referral.dto';
import {
  GetPointHistoryDto,
  GetPointHistoryQueryDto,
} from '../dtos/userProfile/get-point-history.dto';
import { ReferralUuidParamDto } from '../dtos/common/referral-uuid-param.dto';

const router = express.Router();

router
  .route('/')
  .post(validateRequest(CreateReferralDto), wrapAsync(createReferralController))
  .get(
    checkPermission('view_all:referral'),
    wrapAsync(getAllReferralController)
  );
router.post(
  '/:referralId/send-email',
  validateRequest(ReferralUuidParamDto, 'params'),
  checkPermission('resend_email:referral'),
  wrapAsync(resendReferralEmailController)
);

router
  .route('/:referralId')
  .delete(
    validateRequest(ReferralUuidParamDto, 'params'),
    checkPermission('delete:referral'),
    wrapAsync(deleteReferralController)
  )
  .patch(
    validateRequest(ReferralUuidParamDto, 'params'),
    validateRequest(UpdateReferralDto),
    checkPermission('update:referral'),
    wrapAsync(updateReferralController)
  );

router.get(
  '/history',
  validateRequest(GetPointHistoryDto),
  validateRequest(GetPointHistoryQueryDto, 'query'),
  wrapAsync(getUserReferralHistoryController)
);

export default router;
