import express from 'express';

import { validateRequest } from '../../middlewares/validate-request';
import { CreateCampaignDto } from '../../dtos/campaign/create-campaign.dto';
import { GetCampaignDto } from '../../dtos/campaign/get-campaign.dto';
import { UuidParamDto } from '../../dtos/common/uuid-param.dto';
import {
  createCampaignController,
  deleteCampaignController,
  getAllCampaignController,
  getCampaignByIdController,
  updateCampaignController,
} from '../../controllers/admin/campaign';
import { checkPermission } from '../../middlewares/check-permission';
import { wrapAsync } from '../../utils/wrap-async';

const router = express.Router();

router.post(
  '/create',
  checkPermission('create:campaign'),
  validateRequest(CreateCampaignDto),
  wrapAsync(createCampaignController)
);
router.get(
  '/',
  checkPermission('view:campaign'),
  validateRequest(GetCampaignDto, 'query'),
  wrapAsync(getAllCampaignController)
);
router
  .route('/:id')
  .get(
    checkPermission('view:campaign'),
    validateRequest(UuidParamDto, 'params'),
    wrapAsync(getCampaignByIdController)
  )
  .delete(
    checkPermission('delete:campaign'),
    validateRequest(UuidParamDto, 'params'),
    wrapAsync(deleteCampaignController)
  )
  .put(
    checkPermission('update:campaign'),
    validateRequest(UuidParamDto, 'params'),
    validateRequest(CreateCampaignDto),
    wrapAsync(updateCampaignController)
  );

export default router;
