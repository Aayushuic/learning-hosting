import express from 'express';
import { myAccountLifeStyleSurveyController } from '../controllers/survey/myaccount-lifestyle-survey.controller';
import { wrapAsync } from '../utils/wrap-async';
const router = express.Router();

router.get('/account-lifestyle', wrapAsync(myAccountLifeStyleSurveyController));

export default router;
