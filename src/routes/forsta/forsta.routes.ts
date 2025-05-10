import express from 'express';
import { wrapAsync } from '../../utils/wrap-async';
import {
  createPanelist,
  getPanelVariables,
  logOnUser,
} from '../../controllers/forsta/forsta.controller';
import { validateRequest } from '../../middlewares/validate-request';
import { GetPanelVariableDto } from '../../dtos/frosta/get-panel-variable.dto';
import { CreatePanelistDto } from '../../dtos/frosta/create-panelist.dto';

const router = express.Router();

router.post('/logon', wrapAsync(logOnUser));
router.post(
  '/create-panel-list',
  validateRequest(CreatePanelistDto),
  wrapAsync(createPanelist)
);
router.post(
  '/get-panel-variables',
  validateRequest(GetPanelVariableDto),
  wrapAsync(getPanelVariables)
);

export default router;
